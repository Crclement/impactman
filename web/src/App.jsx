import { useState } from 'react'
import FleetMonitoring from './components/FleetMonitoring'
import GamePreview from './components/GamePreview'
import WiringSchematics from './components/WiringSchematics'
import SetupGuide from './components/SetupGuide'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('monitoring')

  const tabs = [
    { id: 'monitoring', label: 'Fleet Monitoring' },
    { id: 'preview', label: 'Game Preview' },
    { id: 'wiring', label: 'Wiring Schematics' },
    { id: 'setup', label: 'Setup Guide' },
  ]

  return (
    <div className="dashboard">
      <header>
        <h1>IMPACTMAN</h1>
        <p>Arcade1Up Raspberry Pi 5 Conversion Dashboard</p>
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
        {activeTab === 'preview' && <GamePreview />}
        {activeTab === 'wiring' && <WiringSchematics />}
        {activeTab === 'setup' && <SetupGuide />}
      </main>
    </div>
  )
}

export default App
