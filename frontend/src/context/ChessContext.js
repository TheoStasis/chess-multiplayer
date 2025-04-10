import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';

const ChessContext = createContext();

export const useChess = () => useContext(ChessContext);

export const ChessProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState({
    fen: '',
    status: {
      check: false,
      checkmate: false
    }
  });
  const [moves, setMoves] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('White');
  const [capturedPieces, setCapturedPieces] = useState({
    white: [],
    black: []
  });
  const [gameId, setGameId] = useState('test-game');
  const [promotionSquare, setPromotionSquare] = useState(null);

  useEffect(() => {
    // Connect to the backend server
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('joinGame', gameId); // Join the game on connection

    // Clean up on unmount
    return () => newSocket.disconnect();
  }, [gameId]);

  useEffect(() => {
    if (!socket) return;

    // Handle initial game state
    socket.on('gameState', ({ fen, status, moves, capturedPieces }) => {
      setGameState({ fen, status });
      setMoves(moves || []);
      if (capturedPieces) setCapturedPieces(capturedPieces);
      setCurrentTurn(fen.split(' ')[1] === 'w' ? 'White' : 'Black');
    });

    // Listen for move updates
    socket.on('moveMade', ({ fen, status, moves, capturedPieces }) => {
      setGameState({ fen, status });
      setMoves(moves || []);
      if (capturedPieces) setCapturedPieces(capturedPieces);
      setCurrentTurn(fen.split(' ')[1] === 'w' ? 'White' : 'Black');
    });

    // Listen for invalid moves
    socket.on('invalidMove', (move) => {
      console.error('Invalid move:', move);
    });

    // Listen for promotion requests
    socket.on('promotionRequired', ({ square }) => {
      console.log('Promotion required at square:', square);
      setPromotionSquare(square);
    });

    return () => {
      socket.off('gameState');
      socket.off('moveMade');
      socket.off('invalidMove');
      socket.off('promotionRequired');
    };
  }, [socket]);

  const makeMove = (move) => {
    if (socket) {
      console.log('Sending move:', move);
      socket.emit('makeMove', { gameId, move });
    }
  };

  const promotePawn = (piece, square) => {
    if (socket && gameId) {
      console.log('Promoting pawn at', square, 'to', piece);
      
      // Create a promotion move
      const move = {
        from: square,
        to: square.charAt(0) + (square.charAt(1) === '7' ? '8' : '1'), // Determine target square
        promotion: piece
      };
      
      // Send the move with promotion information
      socket.emit('makeMove', { gameId, move });
      setPromotionSquare(null);
    }
  };

  const cancelPromotion = () => {
    setPromotionSquare(null);
  };

  // Get display symbol for a piece type
  const getPieceSymbol = (pieceType) => {
    const symbols = {
      p: '♟',
      n: '♞',
      b: '♝',
      r: '♜',
      q: '♛',
      k: '♚'
    };
    return symbols[pieceType] || '';
  };

  const value = {
    gameState,
    moves,
    currentTurn,
    capturedPieces,
    gameId,
    promotionSquare,
    makeMove,
    promotePawn,
    cancelPromotion,
    getPieceSymbol
  };

  return (
    <ChessContext.Provider value={value}>
      {children}
    </ChessContext.Provider>
  );
};

export default ChessContext; 