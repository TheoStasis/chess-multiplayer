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

// Fix duplicated move handler and add promotion logic
io.on('connection', (socket) => {
    // When a move is made
    socket.on('makeMove', ({ gameId, move }) => {
      try {
        const gameData = games.get(gameId);
        const game = gameData.chess;
        const result = game.move(move);
  
        if (result) {
          // Handle pawn promotion
          if (result.promotion) {
            socket.emit('promotionRequired', { 
              square: result.to,
              gameId 
            });
            return;
          }
  
          // Update game state
          gameData.moves.push(move);
          
          io.to(gameId).emit('moveMade', {
            fen: game.fen(),
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
  
    // Add promotion handler
    socket.on('promotePawn', ({ gameId, piece, square }) => {
      const game = games.get(gameId).chess;
      game.move({
        from: square,
        to: square,
        promotion: piece
      });
      
      io.to(gameId).emit('moveMade', {
        fen: game.fen(),
        status: {
          check: game.isCheck(),
          checkmate: game.isCheckmate()
        }
      });
    });
});

// Start the server on port 5000
httpServer.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
