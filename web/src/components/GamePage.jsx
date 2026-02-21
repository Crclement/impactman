import { useState, useEffect, useRef, useCallback } from 'react'
import './GamePage.css'

// Score display with retro styling
function ScoreDisplay({ value, label, icon }) {
  return (
    <div className="summary-item box-3">
      <div className="label">
        {icon && <img src={icon} alt="" className="h-8 mr-2" />}
        <span>{label}</span>
      </div>
      <div className="value">
        <div className="score-view-points">
          <span className="relative">
            {value.toLocaleString()}
            <span className="ontop">{value.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

// Ocean plastic removed with bags icon
function OceanPlasticDisplay({ bags }) {
  return (
    <div className="summary-item box-3">
      <div className="label">
        <div className="text-sm text-center">Ocean Plastic Removed</div>
      </div>
      <div className="value">
        <div className="flex items-center justify-center">
          <div className="score-view-points">
            <span className="relative">
              {bags}
              <span className="ontop">{bags}</span>
            </span>
          </div>
          <div className="uppercase font-agrandir text-sm font-bold ml-4 flex items-center">
            <img src="/images/icons/bags.png" alt="" className="h-8" />
            <span className="ml-2">
              <p className="mb-0">Plastic</p>
              <p>Bags</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Plastic removed progress bar
function PlasticBar({ bags, maxBags = 100 }) {
  const progress = Math.min((bags / maxBags) * 100, 100)

  return (
    <div className="plastic-bar text-navy">
      <div className="plastic-bar__title">{bags} BAGS</div>
      <div className="plastic-bar__slider box-2 rounded-lg">
        <div
          className="plastic-bar__progress"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="plastic-bar__label">PLASTIC REMOVED</div>
    </div>
  )
}

// Leaderboard component
function Leaderboard({ entries }) {
  return (
    <div className="game-card">
      <div className="game-card__title box-3">Leaderboard</div>
      <div className="leaderboard box-3">
        {entries.map((entry, index) => (
          <div
            key={index}
            className={`leaderboard-item ${index === 0 ? 'leaderboard-item--highlight' : ''}`}
          >
            <div className="leaderboard-item__rank">{entry.rank}</div>
            <img
              src={entry.avatar || '/images/homepage/scoreboard/ape-cool.png'}
              alt=""
              className="leaderboard-item__avatar"
            />
            <div className="leaderboard-item__name">{entry.name}</div>
            <div className="leaderboard-item__score">{entry.score.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Allies feed component
function AlliesFeed({ allies }) {
  return (
    <div className="game-card">
      <div className="game-card__title box-3">Allies</div>
      <div className="allies-feed box-3">
        {allies.map((ally, index) => (
          <div key={index} className="allies-item">
            <img src="/images/ship.png" alt="" className="allies-item__icon" />
            <span>
              <b>[{ally.sponsor}]</b> helped <b>[{ally.player}]</b> remove <b>{ally.bags}</b> bags
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Real Impact card
function RealImpact() {
  return (
    <div className="game-card">
      <div className="game-card__title box-3">Real Impact</div>
      <div className="real-impact box-3">
        <img
          src="/images/impact_image.png"
          alt="Ocean cleanup"
          className="real-impact__image"
        />
        <div className="real-impact__content">
          <p>partner:</p>
          <p>ocean voyages institute</p>
          <p className="mt-4">impact guaranteed!</p>
        </div>
        <img src="/images/pipe.png" alt="" className="real-impact__pipe" />
      </div>
    </div>
  )
}

// Sound toggle
function SoundToggle({ isOn, onToggle }) {
  return (
    <div className="sound-toggle" onClick={onToggle}>
      <span className="sound-toggle__label">
        SOUND {isOn ? 'ON' : 'OFF'}
      </span>
      <img
        src={isOn ? '/images/sound/on.png' : '/images/sound/off.png'}
        alt=""
        className="sound-toggle__icon"
      />
    </div>
  )
}

// Egg popup when player finds impact egg
function EggPopup({ bags, onClose }) {
  if (!bags) return null

  return (
    <div className="egg-popup">
      <span className="egg-popup__title">
        <img src="/images/icons/thunder.png" alt="" className="w-6 mr-4" />
        You found an impact egg
      </span>
      <img src="/images/icons/egg.png" alt="" className="egg-popup__egg" />
      <span className="egg-popup__count">{bags} bags removed</span>
      <div className="mt-10 flex items-center justify-center bg-navy rounded-lg overflow-hidden border-4 border-navy">
        <div className="bg-lime px-4 py-2">
          <img src="/images/polygon.png" alt="" className="h-8" />
        </div>
        <div className="border-x-4 border-navy px-4 bg-white h-full flex items-center font-bold text-2xl">
          POLYGON HELPED!
        </div>
        <div className="bg-lime px-4 py-2">
          <img src="/images/newship.png" alt="" className="w-8 h-8" />
        </div>
      </div>
    </div>
  )
}

// Unity game canvas
function UnityGameCanvas({
  gameUrl = '/unity/ImpacBuilds/Build2/impactman-pi',
  onGameEvent,
  isLoading = true
}) {
  const canvasRef = useRef(null)
  const [unityInstance, setUnityInstance] = useState(null)

  useEffect(() => {
    // Load Unity game
    const script = document.createElement('script')
    script.src = `${gameUrl}/Build/impactman-pi.loader.js`
    script.async = true

    script.onload = () => {
      if (window.createUnityInstance && canvasRef.current) {
        window.createUnityInstance(canvasRef.current, {
          dataUrl: `${gameUrl}/Build/impactman-pi.data.unityweb`,
          frameworkUrl: `${gameUrl}/Build/impactman-pi.framework.js.unityweb`,
          codeUrl: `${gameUrl}/Build/impactman-pi.wasm.unityweb`,
          streamingAssetsUrl: 'StreamingAssets',
          companyName: 'Dollar Donation Club',
          productName: 'ImpactMan',
          productVersion: '1.0',
        }).then(instance => {
          setUnityInstance(instance)
          onGameEvent?.({ type: 'ready' })
        }).catch(err => {
          console.error('Unity load error:', err)
          onGameEvent?.({ type: 'error', error: err })
        })
      }
    }

    document.body.appendChild(script)

    // Setup message handler
    window.OnWebMessage = (data) => {
      try {
        const parsed = JSON.parse(data)
        onGameEvent?.(parsed)
      } catch {
        console.log('Unity message:', data)
      }
    }

    return () => {
      document.body.removeChild(script)
      delete window.OnWebMessage
    }
  }, [gameUrl])

  return (
    <div className="unity-game box-3 rounded-lg">
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        className="unity-game__canvas"
        width={600}
        height={664}
      />
      {isLoading && (
        <div className="unity-game__loading">
          <img
            src="/images/header/cool.svg"
            alt="Loading"
            className="unity-game__loading-logo"
            width={57}
            height={57}
          />
        </div>
      )}
    </div>
  )
}

// Main GamePage component
function GamePage({ consoleId = null }) {
  const [gameState, setGameState] = useState({
    score: 0,
    level: 1,
    lives: 3,
    bags: 0,
    isLoading: true,
    soundOn: true,
    eggPopup: null
  })

  const [leaderboard] = useState([
    { rank: 1, name: 'franko', score: 302023, avatar: '/images/homepage/scoreboard/ape-cool.png' },
    { rank: 2, name: 'player2', score: 250000, avatar: '/images/homepage/scoreboard/ape-cool.png' },
    { rank: 3, name: 'player3', score: 200000, avatar: '/images/homepage/scoreboard/ape-cool.png' },
    { rank: 4, name: 'player4', score: 150000, avatar: '/images/homepage/scoreboard/ape-cool.png' },
  ])

  const [allies] = useState([
    { sponsor: 'polygon', player: 'PLAYER', bags: 5 },
    { sponsor: 'polygon', player: 'PLAYER', bags: 5 },
    { sponsor: 'polygon', player: 'PLAYER', bags: 5 },
    { sponsor: 'polygon', player: 'PLAYER', bags: 5 },
  ])

  const handleGameEvent = useCallback((event) => {
    console.log('Game event:', event)

    switch (event.type) {
      case 'ready':
        setGameState(prev => ({ ...prev, isLoading: false }))
        break
      case 'GAME_UPDATE':
        setGameState(prev => ({
          ...prev,
          score: event.currentScore ?? prev.score,
          level: event.currentLevel ?? prev.level,
          bags: event.currentBags ?? prev.bags,
        }))
        break
      case 'egg':
        setGameState(prev => ({
          ...prev,
          eggPopup: event.eggBags
        }))
        setTimeout(() => {
          setGameState(prev => ({ ...prev, eggPopup: null }))
        }, 3000)
        break
    }
  }, [])

  const toggleSound = () => {
    setGameState(prev => ({ ...prev, soundOn: !prev.soundOn }))
    // TODO: Send message to Unity to mute/unmute
  }

  return (
    <div className="game-container">
      <div className="game-page">
        {/* Left Column - Stats */}
        <div className="game-page__section flex flex-col gap-5 w-full">
          {/* Mobile: Real Impact at top */}
          <div className="md:hidden">
            <RealImpact />
          </div>

          {/* Plastic Bar */}
          <PlasticBar bags={gameState.bags} />

          {/* Stats Panel - Desktop */}
          <div className="stats-panel hidden md:block">
            <OceanPlasticDisplay bags={gameState.bags} />
            <ScoreDisplay value={gameState.score} label="Score" />
            <ScoreDisplay
              value={gameState.level}
              label="Level"
              icon="/images/icons/level.png"
            />
            <ScoreDisplay
              value={0}
              label="Tickets Earned"
              icon="/images/icons/tickets.png"
            />
          </div>

          {/* Leaderboard - Desktop */}
          <div className="hidden md:block">
            <Leaderboard entries={leaderboard} />
          </div>
        </div>

        {/* Center - Game Canvas */}
        <div className="game-page__section game-page__section--full">
          <div className="hidden md:block">
            <div className="relative">
              <UnityGameCanvas
                onGameEvent={handleGameEvent}
                isLoading={gameState.isLoading}
              />
              <EggPopup bags={gameState.eggPopup} />

              {/* Sound toggle below game */}
              <div className="absolute -bottom-14 flex gap-2 w-full">
                <div className="ml-auto">
                  <SoundToggle isOn={gameState.soundOn} onToggle={toggleSound} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="game-page__section flex flex-col gap-5 w-full">
          {/* Stats Panel - Mobile */}
          <div className="stats-panel md:hidden">
            <OceanPlasticDisplay bags={gameState.bags} />
            <ScoreDisplay value={gameState.score} label="Score" />
            <ScoreDisplay
              value={gameState.level}
              label="Level"
              icon="/images/icons/level.png"
            />
            <ScoreDisplay
              value={0}
              label="Tickets Earned"
              icon="/images/icons/tickets.png"
            />
          </div>

          {/* Allies Feed */}
          <AlliesFeed allies={allies} />

          {/* Real Impact - Desktop */}
          <div className="hidden md:block">
            <RealImpact />
          </div>

          {/* Leaderboard - Mobile */}
          <div className="md:hidden">
            <Leaderboard entries={leaderboard} />
          </div>
        </div>
      </div>

      {/* Console info bar */}
      {consoleId && (
        <div className="fixed bottom-0 left-0 right-0 bg-navy text-white p-2 text-center text-sm">
          Console: {consoleId}
        </div>
      )}
    </div>
  )
}

export default GamePage
