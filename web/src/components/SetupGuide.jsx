import './SetupGuide.css'

function SetupGuide() {
  return (
    <div className="setup-guide">
      <div className="card full-width">
        <div className="card-header">
          <h2>Pi Setup Scripts</h2>
        </div>
        <div className="card-body">
          <p className="setup-intro">
            Copy these from the <code>/raspi</code> directory:
          </p>
          <ul className="component-list">
            <li>
              <span className="name">setup.sh</span>
              <span className="desc">Full automated setup</span>
            </li>
            <li>
              <span className="name">arcade-gpio.py</span>
              <span className="desc">GPIO to keyboard mapper</span>
            </li>
            <li>
              <span className="name">kiosk.sh</span>
              <span className="desc">Kiosk mode launcher</span>
            </li>
            <li>
              <span className="name">monitor-agent.py</span>
              <span className="desc">Fleet monitoring agent</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card full-width">
        <div className="card-header">
          <h2>Quick Setup Commands</h2>
        </div>
        <div className="card-body">
          <pre className="code-block">{`# SSH into your Pi
ssh pi@impactarcade.local

# Copy setup files
scp -r raspi/* pi@impactarcade.local:~/

# Run setup
cd ~ && chmod +x setup.sh && ./setup.sh

# Reboot to test
sudo reboot`}</pre>
        </div>
      </div>

      <div className="card full-width">
        <div className="card-header">
          <h2>Environment Variables</h2>
        </div>
        <div className="card-body">
          <p className="setup-intro">Set these on each Pi for monitoring:</p>
          <pre className="code-block">{`# Add to ~/.bashrc or /etc/environment
export CONSOLE_ID="IMP-001"
export CONSOLE_NAME="Mall Entrance"
export MONITOR_API="https://impactman.up.railway.app/api/status"`}</pre>
        </div>
      </div>
    </div>
  )
}

export default SetupGuide
