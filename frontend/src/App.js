import React from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';
import MoveHistory from './components/MoveHistory';
import GameInfo from './components/GameInfo';
import { ChessProvider, useChess } from './context/ChessContext';

const ChessGame = () => {
  const { moves, currentTurn, gameState, capturedPieces } = useChess();
  
  return (
    <div className="chess-game">
      <h1>Chess Game</h1>
      <div className="game-container">
        <div className="board-container">
          <ChessBoard />
        </div>
        <div className="info-container">
          <GameInfo 
            currentTurn={currentTurn} 
            gameStatus={gameState.status.checkmate ? 'Checkmate' : gameState.status.check ? 'Check' : null}
            capturedPieces={capturedPieces}
          />
          <MoveHistory moves={moves} />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ChessProvider>
      <div className="App">
        <ChessGame />
      </div>
    </ChessProvider>
  );
}

export default App;
