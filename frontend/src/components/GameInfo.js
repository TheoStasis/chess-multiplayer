import React from 'react';
import './GameInfo.css';

const GameInfo = ({ currentTurn, gameStatus, capturedPieces }) => {
  return (
    <div className="game-info">
      <div className="status-section">
        <h3>Game Status</h3>
        <div className="current-turn">
          Current Turn: <span className={currentTurn.toLowerCase()}>{currentTurn}</span>
        </div>
        {gameStatus && (
          <div className="game-status">
            Status: <span className={gameStatus.toLowerCase()}>{gameStatus}</span>
          </div>
        )}
      </div>
      
      <div className="captured-pieces">
        <h3>Captured Pieces</h3>
        <div className="captured-white">
          <h4>White</h4>
          <div className="pieces-list">
            {capturedPieces.white.map((piece, index) => (
              <span key={`white-${index}`} className="piece">{piece}</span>
            ))}
          </div>
        </div>
        <div className="captured-black">
          <h4>Black</h4>
          <div className="pieces-list">
            {capturedPieces.black.map((piece, index) => (
              <span key={`black-${index}`} className="piece">{piece}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo; 