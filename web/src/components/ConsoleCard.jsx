import './ConsoleCard.css'

function ConsoleCard({ data }) {
  const getTempClass = (temp) => {
    if (temp >= 60) return 'hot'
    if (temp >= 50) return 'warm'
    return 'cool'
  }

  const cardClass = `console-card ${data.status}${data.isPlaying ? ' playing' : ''}`

  return (
    <div className={cardClass}>
      <div className="console-header">
        <div>
          <div className="console-name">{data.name}</div>
          <div className="console-id">{data.consoleId}</div>
        </div>
        <span className={`status-badge ${data.status}`}>
          {data.isPlaying ? 'PLAYING' : data.status}
        </span>
      </div>

      <div className="console-details">
        <div className="detail-item">
          <span className="detail-label">Games Played</span>
          <span className="detail-value score">
            {data.gamesPlayed?.toLocaleString() || 0}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">High Score</span>
          <span className="detail-value score">
            {data.highScore?.toLocaleString() || 0}
          </span>
        </div>
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
      </div>

      {data.isPlaying && (
        <div className="playing-indicator">
          <div>
            <span className="playing-label">Level</span>
            <span className="playing-value"> {data.currentLevel}</span>
          </div>
          <div>
            <span className="playing-label">Score</span>
            <span className="playing-value"> {data.currentScore?.toLocaleString()}</span>
          </div>
          {data.sessionDuration && (
            <div>
              <span className="playing-label">Time</span>
              <span className="playing-value"> {data.sessionDuration}</span>
            </div>
          )}
        </div>
      )}

      <div className="console-footer">
        <span>v<span className="version-tag">{data.version}</span></span>
        <span>{data.lastSeenText}</span>
      </div>
    </div>
  )
}

export default ConsoleCard
