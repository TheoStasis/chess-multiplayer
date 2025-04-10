import React, { useState } from 'react';
import { useChess } from '../context/ChessContext';
import { Chess } from 'chess.js';
import './ChessBoard.css';

const ChessBoard = () => {
  const { gameState, makeMove } = useChess();
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [chess] = useState(new Chess());

  // Update the chess instance when gameState changes
  React.useEffect(() => {
    if (gameState.fen) {
      chess.load(gameState.fen);
    }
  }, [gameState.fen, chess]);

  const handleSquareClick = (position) => {
    if (!selectedSquare) {
      // First click - select a square
      setSelectedSquare(position);
    } else {
      // Second click - make a move
      const move = {
        from: selectedSquare,
        to: position
      };
      
      makeMove(move);
      setSelectedSquare(null);
    }
  };

  // Create an 8x8 grid of squares
  const renderSquares = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isLight = (row + col) % 2 === 0;
        const position = `${String.fromCharCode(97 + col)}${8 - row}`;
        const piece = chess.get(position);
        
        squares.push(
          <div
            key={`${row}-${col}`}
            className={`square ${isLight ? 'light' : 'dark'} ${selectedSquare === position ? 'selected' : ''}`}
            data-position={position}
            onClick={() => handleSquareClick(position)}
          >
            {piece && (
              <div className={`piece ${piece.color} ${piece.type}`}>
                {getPieceSymbol(piece)}
              </div>
            )}
          </div>
        );
      }
    }
    return squares;
  };

  // Get the Unicode symbol for a chess piece
  const getPieceSymbol = (piece) => {
    const symbols = {
      p: '♟', // pawn
      n: '♞', // knight
      b: '♝', // bishop
      r: '♜', // rook
      q: '♛', // queen
      k: '♚'  // king
    };
    
    return piece.color === 'w' ? symbols[piece.type] : symbols[piece.type];
  };

  return (
    <div className="chess-board">
      {renderSquares()}
    </div>
  );
};

export default ChessBoard; 