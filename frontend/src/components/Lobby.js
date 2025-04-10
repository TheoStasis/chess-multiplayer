import React, { useState, useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';

export default function Lobby() {
  const [gameId, setGameId] = useState('');
  const socket = useContext(SocketContext);

  const createGame = () => {
    socket.emit('createGame');
  };

  return (
    <div>
      <button onClick={createGame}>Create Game</button>
      <input 
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        placeholder="Enter Game ID"
      />
      <button onClick={() => socket.emit('joinGame', gameId)}>
        Join Game
      </button>
    </div>
  );
}