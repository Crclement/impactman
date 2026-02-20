import './WiringSchematics.css'

function WiringSchematics() {
  return (
    <div className="wiring-schematics">
      {/* GPIO Wiring */}
      <div className="card">
        <div className="card-header">
          <h2>GPIO Wiring - Joystick & Button</h2>
        </div>
        <div className="card-body">
          <div className="schematic">
            <svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg">
              {/* Pi GPIO Header */}
              <rect x="280" y="20" width="120" height="280" rx="8" fill="#1a472a" stroke="#22c55e" strokeWidth="2"/>
              <text x="340" y="45" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Raspberry Pi 5</text>
              <text x="340" y="60" textAnchor="middle" fill="#888" fontSize="9">GPIO Header</text>

              {/* Pin labels on Pi */}
              <text x="295" y="95" fill="#888" fontSize="9">Pin 11</text>
              <circle cx="310" cy="90" r="6" fill="#22c55e"/>
              <text x="325" y="95" fill="#4ade80" fontSize="8">GPIO17</text>

              <text x="295" y="125" fill="#888" fontSize="9">Pin 13</text>
              <circle cx="310" cy="120" r="6" fill="#3b82f6"/>
              <text x="325" y="125" fill="#60a5fa" fontSize="8">GPIO27</text>

              <text x="295" y="155" fill="#888" fontSize="9">Pin 15</text>
              <circle cx="310" cy="150" r="6" fill="#facc15"/>
              <text x="325" y="155" fill="#fde047" fontSize="8">GPIO22</text>

              <text x="295" y="185" fill="#888" fontSize="9">Pin 16</text>
              <circle cx="310" cy="180" r="6" fill="#f97316"/>
              <text x="325" y="185" fill="#fb923c" fontSize="8">GPIO23</text>

              <text x="295" y="215" fill="#888" fontSize="9">Pin 18</text>
              <circle cx="310" cy="210" r="6" fill="#a855f7"/>
              <text x="325" y="215" fill="#c084fc" fontSize="8">GPIO24</text>

              <text x="295" y="260" fill="#888" fontSize="9">Pin 6</text>
              <circle cx="310" cy="255" r="6" fill="#333" stroke="#666"/>
              <text x="325" y="260" fill="#888" fontSize="8">GND</text>

              {/* Joystick */}
              <rect x="30" y="60" width="100" height="100" rx="8" fill="#252525" stroke="#444"/>
              <text x="80" y="85" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">JOYSTICK</text>
              <circle cx="80" cy="120" r="20" fill="#333" stroke="#555" strokeWidth="2"/>
              <circle cx="80" cy="120" r="8" fill="#444"/>

              {/* Joystick wires */}
              <line x1="130" y1="90" x2="310" y2="90" stroke="#22c55e" strokeWidth="2"/>
              <text x="200" y="85" fill="#22c55e" fontSize="9">UP</text>

              <line x1="130" y1="110" x2="250" y2="110" stroke="#3b82f6" strokeWidth="2"/>
              <line x1="250" y1="110" x2="250" y2="120" stroke="#3b82f6" strokeWidth="2"/>
              <line x1="250" y1="120" x2="310" y2="120" stroke="#3b82f6" strokeWidth="2"/>
              <text x="200" y="105" fill="#3b82f6" fontSize="9">DOWN</text>

              <line x1="130" y1="130" x2="240" y2="130" stroke="#facc15" strokeWidth="2"/>
              <line x1="240" y1="130" x2="240" y2="150" stroke="#facc15" strokeWidth="2"/>
              <line x1="240" y1="150" x2="310" y2="150" stroke="#facc15" strokeWidth="2"/>
              <text x="200" y="145" fill="#facc15" fontSize="9">LEFT</text>

              <line x1="130" y1="150" x2="230" y2="150" stroke="#f97316" strokeWidth="2"/>
              <line x1="230" y1="150" x2="230" y2="180" stroke="#f97316" strokeWidth="2"/>
              <line x1="230" y1="180" x2="310" y2="180" stroke="#f97316" strokeWidth="2"/>
              <text x="175" y="168" fill="#f97316" fontSize="9">RIGHT</text>

              {/* Button */}
              <rect x="30" y="200" width="100" height="60" rx="8" fill="#252525" stroke="#444"/>
              <text x="80" y="225" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">BUTTON</text>
              <circle cx="80" cy="245" r="12" fill="#a855f7" stroke="#c084fc" strokeWidth="2"/>

              {/* Button wire */}
              <line x1="130" y1="230" x2="220" y2="230" stroke="#a855f7" strokeWidth="2"/>
              <line x1="220" y1="230" x2="220" y2="210" stroke="#a855f7" strokeWidth="2"/>
              <line x1="220" y1="210" x2="310" y2="210" stroke="#a855f7" strokeWidth="2"/>
              <text x="160" y="225" fill="#a855f7" fontSize="9">ENTER</text>

              {/* Ground wire */}
              <line x1="80" y1="160" x2="80" y2="180" stroke="#666" strokeWidth="2"/>
              <line x1="80" y1="180" x2="150" y2="180" stroke="#666" strokeWidth="2"/>
              <line x1="150" y1="180" x2="150" y2="280" stroke="#666" strokeWidth="2"/>
              <line x1="80" y1="260" x2="150" y2="260" stroke="#666" strokeWidth="2"/>
              <line x1="150" y1="280" x2="260" y2="280" stroke="#666" strokeWidth="2"/>
              <line x1="260" y1="280" x2="260" y2="255" stroke="#666" strokeWidth="2"/>
              <line x1="260" y1="255" x2="310" y2="255" stroke="#666" strokeWidth="2"/>
              <text x="180" y="295" fill="#888" fontSize="9">GND (common)</text>
            </svg>
          </div>

          <table className="pin-table">
            <thead>
              <tr><th>GPIO Pin</th><th>Physical Pin</th><th>Function</th></tr>
            </thead>
            <tbody>
              <tr><td>GPIO 17</td><td>Pin 11</td><td><span className="wire-color wire-green"></span>Joystick UP</td></tr>
              <tr><td>GPIO 27</td><td>Pin 13</td><td><span className="wire-color wire-blue"></span>Joystick DOWN</td></tr>
              <tr><td>GPIO 22</td><td>Pin 15</td><td><span className="wire-color wire-yellow"></span>Joystick LEFT</td></tr>
              <tr><td>GPIO 23</td><td>Pin 16</td><td><span className="wire-color wire-orange"></span>Joystick RIGHT</td></tr>
              <tr><td>GPIO 24</td><td>Pin 18</td><td><span className="wire-color wire-purple"></span>Button (Enter)</td></tr>
              <tr><td>GND</td><td>Pin 6, 9, 14, 20</td><td><span className="wire-color wire-black"></span>Common Ground</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Display Wiring */}
      <div className="card">
        <div className="card-header">
          <h2>Display Connection</h2>
        </div>
        <div className="card-body">
          <div className="schematic">
            <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
              {/* Pi */}
              <rect x="20" y="60" width="90" height="80" rx="8" fill="#1a472a" stroke="#22c55e" strokeWidth="2"/>
              <text x="65" y="95" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Pi 5</text>
              <text x="65" y="115" textAnchor="middle" fill="#888" fontSize="9">HDMI</text>

              {/* HDMI Cable */}
              <line x1="110" y1="100" x2="160" y2="100" stroke="#3b82f6" strokeWidth="4"/>
              <text x="135" y="90" textAnchor="middle" fill="#60a5fa" fontSize="8">HDMI</text>

              {/* LCD Controller */}
              <rect x="160" y="50" width="120" height="100" rx="8" fill="#252525" stroke="#f97316" strokeWidth="2"/>
              <text x="220" y="85" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">LCD Controller</text>
              <text x="220" y="100" textAnchor="middle" fill="#888" fontSize="8">Board</text>
              <text x="220" y="130" textAnchor="middle" fill="#f97316" fontSize="7">(Match to monitor S/N)</text>

              {/* LVDS Cable */}
              <line x1="280" y1="100" x2="330" y2="100" stroke="#facc15" strokeWidth="4"/>
              <text x="305" y="90" textAnchor="middle" fill="#fde047" fontSize="8">LVDS</text>

              {/* Monitor */}
              <rect x="330" y="40" width="150" height="120" rx="8" fill="#151515" stroke="#444" strokeWidth="2"/>
              <rect x="345" y="55" width="120" height="80" rx="4" fill="#1a1a1a" stroke="#333"/>
              <text x="405" y="100" textAnchor="middle" fill="#666" fontSize="10">Arcade1Up</text>
              <text x="405" y="115" textAnchor="middle" fill="#888" fontSize="8">17" LCD Panel</text>

              {/* Power */}
              <rect x="180" y="160" width="80" height="30" rx="4" fill="#252525" stroke="#ef4444"/>
              <text x="220" y="180" textAnchor="middle" fill="#ef4444" fontSize="9">12V Power</text>
              <line x1="220" y1="150" x2="220" y2="160" stroke="#ef4444" strokeWidth="2"/>
            </svg>
          </div>

          <ul className="component-list">
            <li>
              <span className="name">LCD Controller Board</span>
              <span className="desc">Match to Arcade1Up panel S/N</span>
            </li>
            <li>
              <span className="name">Micro HDMI to HDMI</span>
              <span className="desc">Pi 5 uses micro HDMI</span>
            </li>
            <li>
              <span className="name">12V Power Supply</span>
              <span className="desc">For LCD controller board</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Audio Wiring */}
      <div className="card">
        <div className="card-header">
          <h2>Audio Connection</h2>
        </div>
        <div className="card-body">
          <div className="schematic">
            <svg viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg">
              {/* Pi */}
              <rect x="20" y="45" width="90" height="60" rx="8" fill="#1a472a" stroke="#22c55e" strokeWidth="2"/>
              <text x="65" y="75" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Pi 5</text>
              <text x="65" y="90" textAnchor="middle" fill="#888" fontSize="8">3.5mm Jack</text>

              {/* Audio Cable */}
              <line x1="110" y1="75" x2="160" y2="75" stroke="#22c55e" strokeWidth="3"/>
              <text x="135" y="65" textAnchor="middle" fill="#4ade80" fontSize="8">3.5mm</text>

              {/* Amp */}
              <rect x="160" y="40" width="100" height="70" rx="8" fill="#252525" stroke="#a855f7" strokeWidth="2"/>
              <text x="210" y="70" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Amplifier</text>
              <text x="210" y="85" textAnchor="middle" fill="#888" fontSize="8">PAM8403 or</text>
              <text x="210" y="97" textAnchor="middle" fill="#888" fontSize="8">similar</text>

              {/* Speaker wires */}
              <line x1="260" y1="60" x2="320" y2="40" stroke="#ef4444" strokeWidth="2"/>
              <line x1="260" y1="90" x2="320" y2="110" stroke="#ef4444" strokeWidth="2"/>

              {/* Speakers */}
              <rect x="320" y="20" width="80" height="40" rx="6" fill="#252525" stroke="#444"/>
              <text x="360" y="45" textAnchor="middle" fill="#fff" fontSize="9">Speaker L</text>

              <rect x="320" y="90" width="80" height="40" rx="6" fill="#252525" stroke="#444"/>
              <text x="360" y="115" textAnchor="middle" fill="#fff" fontSize="9">Speaker R</text>

              {/* Power note */}
              <text x="210" y="130" textAnchor="middle" fill="#888" fontSize="8">5V from Pi USB or separate supply</text>
            </svg>
          </div>

          <ul className="component-list">
            <li>
              <span className="name">3.5mm Audio Cable</span>
              <span className="desc">Male to bare wire or RCA</span>
            </li>
            <li>
              <span className="name">PAM8403 Amplifier</span>
              <span className="desc">~3W per channel, 5V powered</span>
            </li>
            <li>
              <span className="name">Arcade1Up Speakers</span>
              <span className="desc">Reuse existing cabinet speakers</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Components Checklist */}
      <div className="card">
        <div className="card-header">
          <h2>Components Checklist</h2>
        </div>
        <div className="card-body">
          <ul className="component-list">
            <li>
              <span className="name">Raspberry Pi 5 (4GB+)</span>
              <span className="desc">Main computer</span>
            </li>
            <li>
              <span className="name">MicroSD Card</span>
              <span className="desc">Samsung EVO 32GB+</span>
            </li>
            <li>
              <span className="name">Pi 5 Power Supply</span>
              <span className="desc">27W USB-C (5V 5A)</span>
            </li>
            <li>
              <span className="name">Micro HDMI to HDMI</span>
              <span className="desc">Video output cable</span>
            </li>
            <li>
              <span className="name">LCD Controller Board</span>
              <span className="desc">Matches Arcade1Up panel</span>
            </li>
            <li>
              <span className="name">12V Power Supply</span>
              <span className="desc">For LCD controller</span>
            </li>
            <li>
              <span className="name">PAM8403 Amp Board</span>
              <span className="desc">Audio amplifier</span>
            </li>
            <li>
              <span className="name">Jumper Wires (F-F)</span>
              <span className="desc">GPIO connections</span>
            </li>
            <li>
              <span className="name">Screw Terminal Breakout</span>
              <span className="desc">Optional - easier wiring</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WiringSchematics
