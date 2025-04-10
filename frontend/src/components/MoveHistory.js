import React from 'react';

export default function MoveHistory({ moves }) {
  return (
    <div className="move-history">
      <h3>Moves</h3>
      <div className="moves-list">
        {moves.map((move, index) => (
          <div key={index} className="move">
            {index % 2 === 0 && <span>{(index/2 + 1)}.</span>}
            <span>{move}</span>
          </div>
        ))}
      </div>
    </div>
  );
}