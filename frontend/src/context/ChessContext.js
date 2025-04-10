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
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    // Connect to the backend server
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Clean up on unmount
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for move updates
    socket.on('moveMade', ({ fen, status }) => {
      setGameState({ fen, status });
      setCurrentTurn(prev => prev === 'White' ? 'Black' : 'White');
    });

    // Listen for invalid moves
    socket.on('invalidMove', (move) => {
      console.error('Invalid move:', move);
    });

    // Listen for promotion requests
    socket.on('promotionRequired', ({ square, gameId }) => {
      // Handle promotion UI here
      console.log('Promotion required for square:', square);
    });

    return () => {
      socket.off('moveMade');
      socket.off('invalidMove');
      socket.off('promotionRequired');
    };
  }, [socket]);

  const makeMove = (move) => {
    if (socket && gameId) {
      socket.emit('makeMove', { gameId, move });
    }
  };

  const promotePawn = (piece, square) => {
    if (socket && gameId) {
      socket.emit('promotePawn', { gameId, piece, square });
    }
  };

  const value = {
    gameState,
    moves,
    currentTurn,
    capturedPieces,
    gameId,
    makeMove,
    promotePawn
  };

  return (
    <ChessContext.Provider value={value}>
      {children}
    </ChessContext.Provider>
  );
};

export default ChessContext; 