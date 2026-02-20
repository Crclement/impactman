import { useRef, useState, useEffect, useCallback } from 'react'
import './GameEmbed.css'

const GAME_BASE_URL = 'https://dev.impactarcade.com/games/impactman'

function GameEmbed({
  consoleId = null,
  consoleConfig = {},
  onGameEvent,
  aspectRatio = '4/3',
  allowFullscreen = true
}) {
  const iframeRef = useRef(null)
  const containerRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [gameState, setGameState] = useState({
    ready: false,
    playing: false,
    score: 0,
    level: 1
  })

  // Build game URL with console params
  const gameUrl = buildGameUrl(consoleId, consoleConfig)

  // Handle messages from the game iframe
  const handleMessage = useCallback((event) => {
    // Validate origin
    if (!event.origin.includes('impactarcade.com')) return

    const { type, payload } = event.data || {}

    switch (type) {
      case 'GAME_READY':
        setGameState(prev => ({ ...prev, ready: true }))
        // Send console config to game
        sendToGame({ type: 'CONSOLE_CONFIG', payload: { consoleId, ...consoleConfig } })
        onGameEvent?.({ type: 'ready', consoleId })
        break

      case 'GAME_START':
        setGameState(prev => ({ ...prev, playing: true, score: 0, level: 1 }))
        onGameEvent?.({ type: 'start', consoleId, payload })
        break

      case 'GAME_UPDATE':
        setGameState(prev => ({
          ...prev,
          score: payload?.score ?? prev.score,
          level: payload?.level ?? prev.level
        }))
        onGameEvent?.({ type: 'update', consoleId, payload })
        break

      case 'GAME_END':
        setGameState(prev => ({ ...prev, playing: false }))
        onGameEvent?.({ type: 'end', consoleId, payload })
        break

      case 'GAME_ERROR':
        console.error('[GameEmbed] Game error:', payload)
        onGameEvent?.({ type: 'error', consoleId, payload })
        break
    }
  }, [consoleId, consoleConfig, onGameEvent])

  // Send message to game iframe
  const sendToGame = useCallback((message) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*')
    }
  }, [])

  // Listen for game messages
  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [handleMessage])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err) {
      console.error('[GameEmbed] Fullscreen error:', err)
    }
  }

  // Expose methods for parent components
  useEffect(() => {
    // Attach bridge methods to ref if parent needs them
    if (iframeRef.current) {
      iframeRef.current.sendToGame = sendToGame
      iframeRef.current.getGameState = () => gameState
    }
  }, [sendToGame, gameState])

  return (
    <div
      ref={containerRef}
      className={`game-embed ${isFullscreen ? 'fullscreen' : ''}`}
      data-aspect={aspectRatio}
    >
      <div className="game-embed__aspect-container" style={{ aspectRatio }}>
        <iframe
          ref={iframeRef}
          src={gameUrl}
          allow="fullscreen; autoplay"
          title="Impactman Game"
          className="game-embed__iframe"
        />

        {/* Overlay UI */}
        <div className="game-embed__overlay">
          {allowFullscreen && (
            <button
              className="game-embed__fullscreen-btn"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <FullscreenExitIcon />
              ) : (
                <FullscreenIcon />
              )}
            </button>
          )}

          {gameState.playing && (
            <div className="game-embed__hud">
              <span className="game-embed__score">Score: {gameState.score}</span>
              <span className="game-embed__level">Level: {gameState.level}</span>
            </div>
          )}
        </div>

        {/* Loading state */}
        {!gameState.ready && (
          <div className="game-embed__loading">
            <div className="game-embed__spinner" />
            <span>Loading game...</span>
          </div>
        )}
      </div>

      {/* Console info bar */}
      {consoleId && (
        <div className="game-embed__console-bar">
          <span className="game-embed__console-id">Console: {consoleId}</span>
          {consoleConfig.name && (
            <span className="game-embed__console-name">{consoleConfig.name}</span>
          )}
        </div>
      )}
    </div>
  )
}

// Build URL with console params
function buildGameUrl(consoleId, config) {
  const url = new URL(GAME_BASE_URL)

  if (consoleId) {
    url.searchParams.set('console', consoleId)
  }
  if (config.mode) {
    url.searchParams.set('mode', config.mode)
  }
  if (config.difficulty) {
    url.searchParams.set('difficulty', config.difficulty)
  }
  if (config.theme) {
    url.searchParams.set('theme', config.theme)
  }
  // Pass embed flag so game knows it's embedded
  url.searchParams.set('embed', '1')

  return url.toString()
}

// Icons
function FullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
    </svg>
  )
}

function FullscreenExitIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
    </svg>
  )
}

export default GameEmbed
