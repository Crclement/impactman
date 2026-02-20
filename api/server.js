const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory store for console statuses (in production, use Redis or a database)
const consoleStatuses = new Map();

// Test data - initialize with 10 consoles
const testConsoles = [
  { consoleId: 'IMP-001', name: 'Mall Entrance', temperature: 42, cpuUsage: 12, memoryUsage: 34, uptime: '14d 6h', version: '1.2.3', gamesPlayed: 1247 },
  { consoleId: 'IMP-002', name: 'Food Court', temperature: 45, cpuUsage: 18, memoryUsage: 41, uptime: '7d 12h', version: '1.2.3', gamesPlayed: 892 },
  { consoleId: 'IMP-003', name: 'Cinema Lobby', temperature: 38, cpuUsage: 8, memoryUsage: 29, uptime: '21d 3h', version: '1.2.3', gamesPlayed: 2103 },
  { consoleId: 'IMP-004', name: 'Sports Bar', temperature: 51, cpuUsage: 22, memoryUsage: 45, uptime: '3d 18h', version: '1.2.2', gamesPlayed: 567 },
  { consoleId: 'IMP-005', name: 'Hotel Lobby', temperature: 0, cpuUsage: 0, memoryUsage: 0, uptime: '-', version: '1.2.1', gamesPlayed: 445 },
  { consoleId: 'IMP-006', name: 'Airport Terminal', temperature: 44, cpuUsage: 15, memoryUsage: 38, uptime: '9d 8h', version: '1.2.3', gamesPlayed: 3201 },
  { consoleId: 'IMP-007', name: 'University Center', temperature: 62, cpuUsage: 78, memoryUsage: 82, uptime: '28d 1h', version: '1.2.0', gamesPlayed: 1876 },
  { consoleId: 'IMP-008', name: 'Bowling Alley', temperature: 41, cpuUsage: 11, memoryUsage: 33, uptime: '5d 22h', version: '1.2.3', gamesPlayed: 723 },
  { consoleId: 'IMP-009', name: 'Pizza Palace', temperature: 47, cpuUsage: 14, memoryUsage: 36, uptime: '11d 15h', version: '1.2.3', gamesPlayed: 1534 },
  { consoleId: 'IMP-010', name: 'Community Center', temperature: 39, cpuUsage: 9, memoryUsage: 31, uptime: '16d 4h', version: '1.2.3', gamesPlayed: 987 },
];

// Initialize test data
testConsoles.forEach((console, index) => {
  const isOffline = index === 4; // Hotel Lobby is offline
  const isWarning = index === 6; // University Center has high load

  consoleStatuses.set(console.consoleId, {
    ...console,
    status: isOffline ? 'offline' : (isWarning ? 'warning' : 'online'),
    lastSeen: isOffline ? Date.now() - 7200000 : Date.now() - Math.floor(Math.random() * 180000),
    gameRunning: !isOffline,
    ip: `192.168.1.${100 + index}`,
    hostname: `impactarcade-${console.consoleId.toLowerCase()}`,
  });
});

// Receive status updates from Pi consoles
app.post('/api/status', (req, res) => {
  const status = req.body;

  if (!status.consoleId) {
    return res.status(400).json({ error: 'consoleId required' });
  }

  // Determine status based on metrics
  let statusLevel = 'online';
  if (status.temperature >= 70 || status.cpuUsage >= 90 || status.memoryUsage >= 90) {
    statusLevel = 'warning';
  }

  consoleStatuses.set(status.consoleId, {
    ...status,
    status: statusLevel,
    lastSeen: Date.now(),
  });

  console.log(`[${new Date().toISOString()}] Status update from ${status.consoleId}: CPU ${status.cpuUsage}%, Temp ${status.temperature}°C`);

  res.json({ success: true });
});

// Get all console statuses
app.get('/api/consoles', (req, res) => {
  const now = Date.now();
  const consoles = [];

  consoleStatuses.forEach((status, id) => {
    // Mark as offline if no update in 2 minutes
    const timeSinceLastSeen = now - status.lastSeen;
    const isOffline = timeSinceLastSeen > 120000;

    consoles.push({
      ...status,
      status: isOffline ? 'offline' : status.status,
      lastSeenText: formatLastSeen(timeSinceLastSeen),
    });
  });

  // Sort by console ID
  consoles.sort((a, b) => a.consoleId.localeCompare(b.consoleId));

  res.json(consoles);
});

// Get single console details
app.get('/api/consoles/:id', (req, res) => {
  const status = consoleStatuses.get(req.params.id);

  if (!status) {
    return res.status(404).json({ error: 'Console not found' });
  }

  const timeSinceLastSeen = Date.now() - status.lastSeen;

  res.json({
    ...status,
    lastSeenText: formatLastSeen(timeSinceLastSeen),
  });
});

// Get fleet summary stats
app.get('/api/stats', (req, res) => {
  const now = Date.now();
  let online = 0, offline = 0, warning = 0;
  let totalGamesPlayed = 0;

  consoleStatuses.forEach((status) => {
    const timeSinceLastSeen = now - status.lastSeen;
    const isOffline = timeSinceLastSeen > 120000;

    if (isOffline) {
      offline++;
    } else if (status.status === 'warning') {
      warning++;
    } else {
      online++;
    }

    totalGamesPlayed += status.gamesPlayed || 0;
  });

  res.json({
    online,
    offline,
    warning,
    total: consoleStatuses.size,
    totalGamesPlayed,
  });
});

function formatLastSeen(ms) {
  if (ms < 60000) return 'Just now';
  if (ms < 3600000) return `${Math.floor(ms / 60000)} min ago`;
  if (ms < 86400000) return `${Math.floor(ms / 3600000)} hours ago`;
  return `${Math.floor(ms / 86400000)} days ago`;
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Impactman API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
