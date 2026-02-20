import { useState, useEffect, useCallback } from 'react'
import Login from './components/Login'
import FleetMonitoring from './components/FleetMonitoring'
import GameEmbed from './components/GameEmbed'
import WiringSchematics from './components/WiringSchematics'
import SetupGuide from './components/SetupGuide'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('monitoring')
  const [consoles, setConsoles] = useState([])
  const [selectedConsole, setSelectedConsole] = useState(null)

  useEffect(() => {
    const auth = localStorage.getItem('impactman_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch consoles for the game embed selector
  useEffect(() => {
    if (!isAuthenticated) return
    fetch('/api/consoles')
      .then(res => res.json())
      .then(data => {
        setConsoles(data)
        // Auto-select first console if none selected
        if (!selectedConsole && data.length > 0) {
          setSelectedConsole(data[0])
        }
      })
      .catch(err => console.error('Failed to fetch consoles:', err))
  }, [isAuthenticated, selectedConsole])

  const handleGameEvent = useCallback((event) => {
    console.log('[App] Game event:', event)
    // Could trigger notifications, update stats, etc.
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('impactman_auth')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  const tabs = [
    { id: 'monitoring', label: 'Fleet Monitoring' },
    { id: 'play', label: 'Play Game' },
    { id: 'wiring', label: 'Wiring Schematics' },
    { id: 'setup', label: 'Setup Guide' },
  ]

  return (
    <div className="dashboard">
      <header>
        <h1>IMPACTMAN</h1>
        <p>Arcade1Up Raspberry Pi 5 Conversion Dashboard</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <nav className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="tab-content">
        {activeTab === 'monitoring' && <FleetMonitoring />}
        {activeTab === 'play' && (
          <div className="game-tab">
            <div className="card full-width">
              <div className="card-header">
                <h2>Play Game</h2>
                {consoles.length > 0 && (
                  <select
                    className="console-select"
                    value={selectedConsole?.id || ''}
                    onChange={(e) => {
                      const console = consoles.find(c => c.id === e.target.value)
                      setSelectedConsole(console)
                    }}
                  >
                    {consoles.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name || c.id}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="card-body game-card-body">
                <GameEmbed
                  consoleId={selectedConsole?.id}
                  consoleConfig={{
                    name: selectedConsole?.name,
                    mode: 'arcade',
                    difficulty: 'normal'
                  }}
                  onGameEvent={handleGameEvent}
                  aspectRatio="4/3"
                  allowFullscreen={true}
                />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'wiring' && <WiringSchematics />}
        {activeTab === 'setup' && <SetupGuide />}
      </main>
    </div>
  )
}

export default App
