import { useRef, useState, useEffect, useCallback } from 'react'

/**
 * Hook for bidirectional communication with an embedded game
 *
 * @param {Object} options
 * @param {string} options.consoleId - Console identifier
 * @param {string} options.apiBase - API base URL for game events
 * @param {Function} options.onEvent - Callback for game events
 * @returns {Object} Bridge interface
 */
export function useGameBridge({
  consoleId,
  apiBase = '/api',
  onEvent
} = {}) {
  const iframeRef = useRef(null)
  const [gameState, setGameState] = useState({
    ready: false,
    playing: false,
    score: 0,
    level: 1,
    sessionId: null
  })

  // Send message to game iframe
  const sendToGame = useCallback((message) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*')
      return true
    }
    return false
  }, [])

  // API calls for game events
  const reportGameStart = useCallback(async () => {
    if (!consoleId) return null

    try {
      const res = await fetch(`${apiBase}/game/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consoleId })
      })
      const data = await res.json()
      setGameState(prev => ({ ...prev, sessionId: data.sessionId }))
      return data
    } catch (err) {
      console.error('[useGameBridge] Failed to report game start:', err)
      return null
    }
  }, [consoleId, apiBase])

  const reportGameUpdate = useCallback(async (score, level) => {
    if (!consoleId) return null

    try {
      await fetch(`${apiBase}/game/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consoleId, score, level })
      })
    } catch (err) {
      console.error('[useGameBridge] Failed to report game update:', err)
    }
  }, [consoleId, apiBase])

  const reportGameEnd = useCallback(async (finalScore) => {
    if (!consoleId) return null

    try {
      const res = await fetch(`${apiBase}/game/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consoleId, score: finalScore })
      })
      const data = await res.json()
      setGameState(prev => ({ ...prev, sessionId: null }))
      return data
    } catch (err) {
      console.error('[useGameBridge] Failed to report game end:', err)
      return null
    }
  }, [consoleId, apiBase])

  // Handle incoming messages from game
  const handleMessage = useCallback((event) => {
    // Basic origin validation
    const { type, payload } = event.data || {}

    if (!type) return

    switch (type) {
      case 'GAME_READY':
        setGameState(prev => ({ ...prev, ready: true }))
        onEvent?.({ type: 'ready', payload })
        break

      case 'GAME_START':
        setGameState(prev => ({ ...prev, playing: true, score: 0, level: 1 }))
        reportGameStart()
        onEvent?.({ type: 'start', payload })
        break

      case 'GAME_UPDATE':
        setGameState(prev => ({
          ...prev,
          score: payload?.score ?? prev.score,
          level: payload?.level ?? prev.level
        }))
        reportGameUpdate(payload?.score, payload?.level)
        onEvent?.({ type: 'update', payload })
        break

      case 'GAME_END':
        setGameState(prev => ({ ...prev, playing: false }))
        reportGameEnd(payload?.score)
        onEvent?.({ type: 'end', payload })
        break

      case 'GAME_ERROR':
        console.error('[useGameBridge] Game error:', payload)
        onEvent?.({ type: 'error', payload })
        break
    }
  }, [onEvent, reportGameStart, reportGameUpdate, reportGameEnd])

  // Listen for messages
  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [handleMessage])

  // Game control methods
  const startGame = useCallback(() => {
    sendToGame({ type: 'START_GAME' })
  }, [sendToGame])

  const pauseGame = useCallback(() => {
    sendToGame({ type: 'PAUSE_GAME' })
  }, [sendToGame])

  const resumeGame = useCallback(() => {
    sendToGame({ type: 'RESUME_GAME' })
  }, [sendToGame])

  const resetGame = useCallback(() => {
    sendToGame({ type: 'RESET_GAME' })
  }, [sendToGame])

  const setDifficulty = useCallback((difficulty) => {
    sendToGame({ type: 'SET_DIFFICULTY', payload: { difficulty } })
  }, [sendToGame])

  const setTheme = useCallback((theme) => {
    sendToGame({ type: 'SET_THEME', payload: { theme } })
  }, [sendToGame])

  return {
    // Ref to attach to iframe
    iframeRef,

    // Current game state
    gameState,

    // Send arbitrary message
    sendToGame,

    // Game controls
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    setDifficulty,
    setTheme,

    // Manual API reporting (if game doesn't send events)
    reportGameStart,
    reportGameUpdate,
    reportGameEnd
  }
}

export default useGameBridge
