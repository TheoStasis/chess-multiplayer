import React from 'react';
import './PromotionDialog.css';
import { useChess } from '../context/ChessContext';

const PromotionDialog = ({ square, onClose }) => {
  const { promotePawn, currentTurn } = useChess();
  const pieces = ['q', 'r', 'n', 'b']; // Queen, Rook, Knight, Bishop
  
  const handlePieceSelect = (piece) => {
    promotePawn(piece, square);
    onClose();
  };

  const getPieceSymbol = (piece) => {
    const symbols = {
      q: currentTurn === 'White' ? '♕' : '♛', // queen
      r: currentTurn === 'White' ? '♖' : '♜', // rook
      n: currentTurn === 'White' ? '♘' : '♞', // knight
      b: currentTurn === 'White' ? '♗' : '♝'  // bishop
    };
    return symbols[piece];
  };

  const getPieceName = (piece) => {
    const names = {
      q: 'Queen',
      r: 'Rook',
      n: 'Knight',
      b: 'Bishop'
    };
    return names[piece];
  };

  return (
    <div className="promotion-overlay" onClick={onClose}>
      <div className="promotion-dialog" onClick={e => e.stopPropagation()}>
        <h3>Promote Pawn to:</h3>
        <div className="promotion-pieces">
          {pieces.map(piece => (
            <div 
              key={piece} 
              className="promotion-piece"
              onClick={() => handlePieceSelect(piece)}
              title={getPieceName(piece)}
            >
              <span className="piece-symbol">{getPieceSymbol(piece)}</span>
              <span className="piece-name">{getPieceName(piece)}</span>
            </div>
          ))}
        </div>
        <div className="promotion-info">
          Click outside to cancel
        </div>
      </div>
    </div>
  );
};

export default PromotionDialog; 