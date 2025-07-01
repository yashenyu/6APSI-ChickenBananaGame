import React, { useState, useEffect, useRef } from 'react';

const chickenImg = 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg';
const bananaImg = 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768';

function App() {
  const [ws, setWs] = useState(null);
  const [board, setBoard] = useState([]);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [playerType, setPlayerType] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const wsRef = useRef(null);

  // Change this to your server's IP if testing on another device on LAN
  const SERVER_URL = 'ws://localhost:8080';

  useEffect(() => {
    const socket = new WebSocket(SERVER_URL);
    wsRef.current = socket;

    socket.onopen = () => {
      console.log('Connected to server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Message received:', data);

      if (data.type === 'init') {
        setBoard(data.state.board);
        setClickedIndices(data.state.clickedIndices || []);
        setGameOver(data.state.gameOver);
        setWinner(data.state.winner);
        setPlayerType(data.playerType);
        setPlayerId(data.playerId);
      }

      if (data.type === 'update') {
        setBoard(data.state.board);
        setClickedIndices(data.state.clickedIndices || []);
        setGameOver(data.state.gameOver);
        setWinner(data.state.winner);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from server');
    };

    setWs(socket);

    return () => socket.close();
  }, [SERVER_URL]);

  const handleTileClick = (index) => {
    if (gameOver || clickedIndices.includes(index)) return;
    if (!ws) return;

    ws.send(JSON.stringify({ type: 'click', index }));
  };

  const handleReset = () => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'reset' }));
    }
  };

  const getImageUrl = (img) => (img === 'chicken' ? chickenImg : bananaImg);

  return (
    <div className="container" style={{ textAlign: 'center', padding: 20 }}>
      <h1>🐔🍌 Chicken Banana Game!</h1>
      <p>You are playing as: <strong>{playerType === 'chicken' ? '🐔 Chicken' : '🍌 Banana'}</strong></p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 100px)',
        gridGap: 10,
        justifyContent: 'center',
        marginTop: 20,
      }}>
        {board.length === 0 && <p>Loading board...</p>}
        {board.map((img, idx) => (
          <div
            key={idx}
            onClick={() => handleTileClick(idx)}
            style={{
              width: 100,
              height: 100,
              border: '2px solid #ccc',
              backgroundColor: clickedIndices.includes(idx) ? 'white' : '#eee',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: gameOver || clickedIndices.includes(idx) ? 'default' : 'pointer',
              fontSize: 24,
              fontWeight: 'bold',
              userSelect: 'none',
            }}
          >
            {clickedIndices.includes(idx) ? (
              <img src={getImageUrl(img)} alt="revealed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              idx + 1
            )}
          </div>
        ))}
      </div>

      {gameOver && (
        <div style={{ marginTop: 20 }}>
          <h2>
            {winner === playerType
              ? '🎉 You Win! +5 Points!'
              : '❌ You Lost!'}
          </h2>
          <button onClick={handleReset} style={{ padding: '10px 20px', fontSize: 18 }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
