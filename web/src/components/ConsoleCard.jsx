import './ConsoleCard.css'

function ConsoleCard({ data }) {
  const getTempClass = (temp) => {
    if (temp >= 60) return 'hot'
    if (temp >= 50) return 'warm'
    return 'cool'
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Connected'
      case 'warning': return 'High Load'
      case 'offline': return 'Disconnected'
      default: return status
    }
  }

  return (
    <div className={`console-card ${data.status}`}>
      <div className="console-header">
        <div>
          <div className="console-name">{data.name}</div>
          <div className="console-id">{data.consoleId}</div>
        </div>
        <span className={`status-badge ${data.status}`}>{data.status}</span>
      </div>

      <div className="console-details">
        <div className="detail-item">
          <span className="detail-label">Temperature</span>
          <span className={`detail-value ${getTempClass(data.temperature)}`}>
            {data.temperature > 0 ? `${data.temperature}°C` : '-'}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">CPU</span>
          <span className="detail-value">
            {data.cpuUsage > 0 ? `${data.cpuUsage}%` : '-'}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Memory</span>
          <span className="detail-value">
            {data.memoryUsage > 0 ? `${data.memoryUsage}%` : '-'}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Uptime</span>
          <span className="detail-value">{data.uptime}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Games Played</span>
          <span className="detail-value">
            {data.gamesPlayed?.toLocaleString() || 0}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Last Seen</span>
          <span className="detail-value">{data.lastSeenText}</span>
        </div>
      </div>

      <div className="console-footer">
        <span>Version: <span className="version-tag">{data.version}</span></span>
        <span>{getStatusText(data.status)}</span>
      </div>
    </div>
  )
}

export default ConsoleCard
