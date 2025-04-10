import React from 'react';
import { useChess } from '../context/ChessContext';
import './MoveHistory.css';

const MoveHistory = () => {
  const { moves } = useChess();
  
  // Organize moves into pairs (white and black moves)
  const renderMoveHistory = () => {
    const movePairs = [];
    for (let i = 0; i < moves.length; i += 2) {
      movePairs.push({
        number: Math.floor(i / 2) + 1,
        white: moves[i],
        black: i + 1 < moves.length ? moves[i + 1] : null
      });
    }
    
    return movePairs.map((pair, index) => (
      <div key={index} className="move-entry">
        <span className="move-number">{pair.number}.</span>
        <span className="move-text">{pair.white}</span>
        {pair.black && <span className="move-text">{pair.black}</span>}
      </div>
    ));
  };

  return (
    <div className="move-history">
      <h3>Move History</h3>
      <div className="moves-list">
        {moves.length > 0 ? renderMoveHistory() : <div className="no-moves">No moves yet</div>}
      </div>
    </div>
  );
};

export default MoveHistory; 