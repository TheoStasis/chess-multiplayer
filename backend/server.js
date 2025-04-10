const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { Chess } = require('chess.js');
const cors = require('cors');

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

// Game state storage
const games = new Map();

// Corrected socket.io connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Move createGame handler INSIDE the connection callback
  socket.on('createGame', () => {
    const gameId = Date.now().toString();
    const chess = new Chess();
    games.set(gameId, {
      chess,
      players: {},
      moves: []
    });
    socket.join(gameId);
    socket.emit('gameCreated', gameId);
  });

  // Add joinGame handler here too
  socket.on('joinGame', (gameId) => {
    if (!games.has(gameId)) {
      return socket.emit('error', 'Game not found');
    }
    // ... rest of join logic
  });

  // Basic ping-pong
  socket.on('ping', (cb) => cb('pong'));

  // Add to socket.io connection handler
socket.on('makeMove', ({ gameId, move }) => {
    try {
      const game = games.get(gameId).chess;
      const result = game.move(move);
  
      if (result) {
        // Broadcast new state to all in room
        io.to(gameId).emit('moveMade', {
          fen: game.fen(),
          turn: game.turn(),
          status: {
            check: game.isCheck(),
            checkmate: game.isCheckmate()
          }
        });
      }
    } catch (error) {
      socket.emit('invalidMove', move);
    }
  });
});

httpServer.listen(5000, () => {
  console.log('Server listening on port 5000');
});