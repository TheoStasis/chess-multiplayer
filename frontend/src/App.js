import React from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';
import MoveHistory from './components/MoveHistory';
import GameInfo from './components/GameInfo';
import PromotionDialog from './components/PromotionDialog';
import { ChessProvider, useChess } from './context/ChessContext';

const ChessGame = () => {
  const { promotionSquare, cancelPromotion } = useChess();
  
  return (
    <div className="chess-game">
      <h1>Chess Game</h1>
      <div className="game-container">
        <div className="board-container">
          <ChessBoard />
        </div>
        <div className="info-container">
          <GameInfo />
          <MoveHistory />
        </div>
      </div>
      
      {promotionSquare && (
        <PromotionDialog 
          square={promotionSquare} 
          onClose={cancelPromotion}
        />
      )}
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
