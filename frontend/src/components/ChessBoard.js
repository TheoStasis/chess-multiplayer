const [showPromotion, setShowPromotion] = useState(false);

const handlePromotionChoice = (piece) => {
  // Send promotion choice to backend
  socket.emit('promotePawn', { gameId, piece });
  setShowPromotion(false);
};

return (
  <>
    <Chessboard /* ... */ />
    {showPromotion && (
      <div className="promotion-dialog">
        <button onClick={() => handlePromotionChoice('q')}>♕ Queen</button>
        <button onClick={() => handlePromotionChoice('r')}>♖ Rook</button>
        <button onClick={() => handlePromotionChoice('b')}>♗ Bishop</button>
        <button onClick={() => handlePromotionChoice('n')}>♘ Knight</button>
      </div>
    )}
  </>
);