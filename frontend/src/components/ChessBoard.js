import React, { useState, useContext } from 'react';
import { Chessboard } from 'react-chessboard';
import { SocketContext } from '../contexts/SocketContext';

export default function ChessBoard({ gameId }) {
  const [showPromotion, setShowPromotion] = useState(false);
  const socket = useContext(SocketContext);

  const handlePromotionChoice = (piece) => {
    socket.emit("promotePawn", { gameId, piece });
    setShowPromotion(false);
  };

  return (
    <div className="chess-board">
      <Chessboard
        boardWidth={560}
        // Add other necessary props
      />
      {showPromotion && (
        <div className="promotion-dialog">
          <button onClick={() => handlePromotionChoice('q')}>♕ Queen</button>
          <button onClick={() => handlePromotionChoice('r')}>♖ Rook</button>
          <button onClick={() => handlePromotionChoice('b')}>♗ Bishop</button>
          <button onClick={() => handlePromotionChoice('n')}>♘ Knight</button>
        </div>
      )}
    </div>
  );
}