import React, { useState } from 'react';
import { useChess } from '../context/ChessContext';
import { Chess } from 'chess.js';
import './ChessBoard.css';

const ChessBoard = () => {
  const { gameState, makeMove } = useChess();
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [chess] = useState(new Chess());
  const [validMoves, setValidMoves] = useState([]);
  
  // Find king's position for the current player in check
  const findKingInCheck = () => {
    if (!gameState.status || !gameState.status.check) return null;
    
    // Find king of the current turn
    const kingColor = chess.turn();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const position = `${String.fromCharCode(97 + col)}${8 - row}`;
        const piece = chess.get(position);
        if (piece && piece.type === 'k' && piece.color === kingColor) {
          return position;
        }
      }
    }
    return null;
  };

  // Update the chess instance when gameState changes
  React.useEffect(() => {
    if (gameState.fen) {
      chess.load(gameState.fen);
    }
  }, [gameState.fen, chess]);

  const handleSquareClick = (position) => {
    // Get the piece at the position
    const piece = chess.get(position);
    
    // If a square is already selected, attempt to make a move
    if (selectedSquare) {
      // Check if the clicked square is a valid move
      if (validMoves.includes(position)) {
        const move = {
          from: selectedSquare,
          to: position
        };
        
        makeMove(move);
        setSelectedSquare(null);
        setValidMoves([]);
      } 
      // If clicking on a piece of the same color, select that piece instead
      else if (piece && piece.color === chess.turn()) {
        // Calculate valid moves for the new selected piece
        const moves = chess.moves({ square: position, verbose: true });
        setSelectedSquare(position);
        setValidMoves(moves.map(move => move.to));
      } 
      // If clicking on an invalid square, deselect the current piece
      else {
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } 
    // If no square is selected and a piece of the current turn's color is clicked, select it
    else if (piece && piece.color === chess.turn()) {
      const moves = chess.moves({ square: position, verbose: true });
      setSelectedSquare(position);
      setValidMoves(moves.map(move => move.to));
    }
  };

  // Create an 8x8 grid of squares
  const renderSquares = () => {
    const squares = [];
    const kingInCheck = findKingInCheck();
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isLight = (row + col) % 2 === 0;
        const position = `${String.fromCharCode(97 + col)}${8 - row}`;
        const piece = chess.get(position);
        const isValidMove = validMoves.includes(position);
        const isKingInCheck = position === kingInCheck;
        
        squares.push(
          <div
            key={`${row}-${col}`}
            className={`square ${isLight ? 'light' : 'dark'} 
                      ${selectedSquare === position ? 'selected' : ''}
                      ${isValidMove ? 'valid-move' : ''}
                      ${isKingInCheck ? 'king-in-check' : ''}`}
            data-position={position}
            onClick={() => handleSquareClick(position)}
          >
            {piece && (
              <div className={`piece ${piece.color} ${piece.type} ${isKingInCheck ? 'king-in-check' : ''}`}>
                {getPieceSymbol(piece)}
              </div>
            )}
            {isValidMove && !piece && <div className="move-indicator"></div>}
            {isValidMove && piece && <div className="capture-indicator"></div>}
          </div>
        );
      }
    }
    return squares;
  };

  // Get the Unicode symbol for a chess piece
  const getPieceSymbol = (piece) => {
    const symbols = {
      w: {
        p: '♙', // white pawn
        n: '♘', // white knight
        b: '♗', // white bishop
        r: '♖', // white rook
        q: '♕', // white queen
        k: '♔'  // white king
      },
      b: {
        p: '♟', // black pawn
        n: '♞', // black knight
        b: '♝', // black bishop
        r: '♜', // black rook
        q: '♛', // black queen
        k: '♚'  // black king
      }
    };
    
    return symbols[piece.color][piece.type];
  };

  return (
    <div className="chess-board">
      {renderSquares()}
    </div>
  );
};

export default ChessBoard; 