import { useState } from 'react'
import './Login.css'

function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password === 'sanwa') {
      localStorage.setItem('impactman_auth', 'true')
      onLogin()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setPassword('')
    }
  }

  return (
    <div className="login-container">
      <div className={`login-card ${shake ? 'shake' : ''}`}>
        <div className="login-header">
          <h1>IMPACTMAN</h1>
          <p>Arcade Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="password">Enter Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="Password"
              autoFocus
            />
          </div>

          {error && (
            <div className="error-message">
              Incorrect password
            </div>
          )}

          <button type="submit" className="login-btn">
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
