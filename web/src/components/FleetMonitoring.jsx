import { useState, useEffect } from 'react'
import ConsoleCard from './ConsoleCard'
import './FleetMonitoring.css'

function FleetMonitoring() {
  const [consoles, setConsoles] = useState([])
  const [stats, setStats] = useState({ online: 0, offline: 0, warning: 0, total: 0 })
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [consolesRes, statsRes] = await Promise.all([
        fetch('/api/consoles'),
        fetch('/api/stats')
      ])

      const consolesData = await consolesRes.json()
      const statsData = await statsRes.json()

      setConsoles(consolesData)
      setStats(statsData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 10000) // Refresh every 10s
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    fetchData()
  }

  return (
    <div className="fleet-monitoring">
      <div className="card full-width">
        <div className="card-header">
          <h2>Arcade Fleet Overview</h2>
          <button className="refresh-btn" onClick={handleRefresh} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        <div className="card-body">
          <div className="fleet-stats">
            <div className="stat-card">
              <div className="stat-value online">{stats.online}</div>
              <div className="stat-label">Online</div>
            </div>
            <div className="stat-card">
              <div className="stat-value offline">{stats.offline}</div>
              <div className="stat-label">Offline</div>
            </div>
            <div className="stat-card">
              <div className="stat-value warning">{stats.warning}</div>
              <div className="stat-label">Warning</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Units</div>
            </div>
          </div>

          <div className="console-grid">
            {consoles.map(console => (
              <ConsoleCard key={console.consoleId} data={console} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FleetMonitoring
