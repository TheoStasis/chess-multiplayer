import React from 'react';
import { useChess } from '../context/ChessContext';
import './GameInfo.css';

const GameInfo = () => {
  const { currentTurn, gameState, capturedPieces, getPieceSymbol } = useChess();
  
  // Render captured pieces with proper symbols
  const renderCapturedPieces = (pieces, color) => {
    if (!pieces || pieces.length === 0) {
      return <div className="no-pieces">None</div>;
    }
    
    return pieces.map((piece, index) => (
      <span key={`${color}-${index}`} className="piece">
        {getPieceSymbol(piece)}
      </span>
    ));
  };

  // Determine game status text
  const getGameStatus = () => {
    if (gameState.status.checkmate) return 'Checkmate';
    if (gameState.status.check) return 'Check';
    return 'In Progress';
  };

  return (
    <div className="game-info">
      <div className="status-section">
        <h3>Game Status</h3>
        <div className="current-turn">
          Current Turn: <span className={currentTurn.toLowerCase()}>{currentTurn}</span>
        </div>
        <div className="game-status">
          Status: <span className={gameState.status.checkmate ? 'checkmate' : gameState.status.check ? 'check' : ''}>{getGameStatus()}</span>
        </div>
      </div>
      
      <div className="captured-pieces">
        <h3>Captured Pieces</h3>
        <div className="captured-white">
          <h4>White</h4>
          <div className="pieces-list">
            {renderCapturedPieces(capturedPieces.white, 'white')}
          </div>
        </div>
        <div className="captured-black">
          <h4>Black</h4>
          <div className="pieces-list">
            {renderCapturedPieces(capturedPieces.black, 'black')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo; 