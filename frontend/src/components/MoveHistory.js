import React, { useRef, useEffect } from 'react';
import { useChess } from '../context/ChessContext';
import './MoveHistory.css';

const MoveHistory = () => {
  const { moves } = useChess();
  const movesListRef = useRef(null);
  
  // Auto-scroll to bottom when new moves are added
  useEffect(() => {
    if (movesListRef.current) {
      movesListRef.current.scrollTop = movesListRef.current.scrollHeight;
    }
  }, [moves]);
  
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
      <div className="moves-list" ref={movesListRef}>
        {moves.length > 0 ? renderMoveHistory() : <div className="no-moves">No moves yet</div>}
      </div>
    </div>
  );
};

export default MoveHistory; 