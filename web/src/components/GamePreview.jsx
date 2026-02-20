import './GamePreview.css'

function GamePreview() {
  return (
    <div className="game-preview">
      <div className="card full-width">
        <div className="card-header">
          <h2>Game Preview</h2>
        </div>
        <div className="card-body">
          <iframe
            src="https://dev.impactarcade.com/games/impactman"
            allow="fullscreen"
            title="Impactman Game"
          />
        </div>
      </div>
    </div>
  )
}

export default GamePreview
