import React, { useState } from 'react';

const chickenImg = 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg';
const bananaImg = 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768';

function generateBoard(size = 36) { 
  const chicken = Array(size / 2).fill('chicken');
  const banana = Array(size / 2).fill('banana');
  const board = chicken.concat(banana);
  for (let i = board.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [board[i], board[j]] = [board[j], board[i]];
  }
  return board;
}

function App() {
  const [playerType, setPlayerType] = useState(null);
  const [board, setBoard] = useState([]);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [mistakeIndex, setMistakeIndex] = useState(null);
  const [revealAll, setRevealAll] = useState(false);

  const startGame = (type) => {
    setPlayerType(type);
    const newBoard = generateBoard();
    setBoard(newBoard);
    setClickedIndices([]);
    setGameOver(false);
    setWinner(null);
    setMistakeIndex(null);
    setRevealAll(false);
  };

  const handleTileClick = (idx) => {
    if (gameOver || clickedIndices.includes(idx)) return;
    const tile = board[idx];
    if (tile !== playerType) {
      setGameOver(true);
      setWinner(playerType === 'chicken' ? 'banana' : 'chicken');
      setMistakeIndex(idx);
    } else {
      const newClicked = [...clickedIndices, idx];
      setClickedIndices(newClicked);
      const totalTarget = board.filter(i => i === playerType).length;
      const playerClicks = newClicked.filter(i => board[i] === playerType).length;
      if (playerClicks === totalTarget) {
        setGameOver(true);
        setWinner(playerType);
      }
    }
  };

  const handleRevealAll = () => {
    setRevealAll(true);
  };

  return (
    <div className="container" style={{ textAlign: 'center', padding: 20 }}>
      <h1>Chicken Banana Game!</h1>
      <button
        onClick={() => {
          setPlayerType(null);
          setBoard([]);
          setClickedIndices([]);
          setGameOver(false);
          setWinner(null);
          setMistakeIndex(null);
          setRevealAll(false);
        }}
        style={{ position: 'absolute', top: 20, right: 20, padding: '8px 16px', fontSize: 14 }}
      >
        Reset
      </button>
      {!playerType && (
        <div className="select-player">
          <button onClick={() => startGame('chicken')}>Play as Chicken 🐔</button>
          <button onClick={() => startGame('banana')}>Play as Banana 🍌</button>
        </div>
      )}
      {playerType && (
        <>
          <p>You are playing as: <strong>{playerType === 'chicken' ? '🐔 Chicken' : '🍌 Banana'}</strong></p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 60px)',
            gridGap: 6,
            justifyContent: 'center',
            marginTop: 10,
          }}>
            {board.length === 0 && <p>Loading board...</p>}
            {board.map((img, idx) => {
              const isRevealed = clickedIndices.includes(idx) || revealAll || (gameOver && mistakeIndex === idx);
              const isMistake = mistakeIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleTileClick(idx)}
                  style={{
                    width: 60,
                    height: 60,
                    border: '2px solid #ccc',
                    backgroundColor: isMistake ? '#ffcccc' : (isRevealed ? 'white' : '#eee'),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: gameOver || isRevealed ? 'default' : 'pointer',
                    fontSize: 16,
                    fontWeight: 'bold',
                    userSelect: 'none',
                    padding: 0,
                  }}
                >
                  {isRevealed ? (
                    <img src={img === 'chicken' ? chickenImg : bananaImg} alt={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span className="hidden-tile">{idx + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
          {gameOver && (
            <div style={{ marginTop: 20 }}>
              <h2>
                {winner === playerType
                  ? '🎉 You Win! +5 Points!'
                  : '❌ You Lost!'}
              </h2>
              <button onClick={() => startGame(playerType)} style={{ padding: '10px 20px', fontSize: 18 }}>
                Play Again
              </button>
              <button onClick={handleRevealAll} style={{ padding: '10px 20px', fontSize: 18 }}>
                Reveal All Tiles
              </button>
            </div>
          )}
          {!gameOver && (
            <button onClick={handleRevealAll} style={{ marginTop: 20 }}>Reveal All Tiles</button>
          )}
        </>
      )}
    </div>
  );
}

export default App;