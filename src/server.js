const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let clients = [];
let gameState = {
  board: [],
  clickedIndices: [],
  playerTypes: {}, 
  gameOver: false,
  winner: null,
};

function generateBoard(size = 12) {
  const chickenImg = 'chicken';
  const bananaImg = 'banana';
  const images = Array(size / 2).fill(chickenImg).concat(Array(size / 2).fill(bananaImg));
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  return images;
}

gameState.board = generateBoard();

wss.on('connection', function connection(ws) {
  const id = Date.now().toString();
  console.log('New client connected:', id);
  clients.push({ id, ws });

  if (!gameState.playerTypes[id]) {
    if (Object.values(gameState.playerTypes).includes('chicken')) {
      gameState.playerTypes[id] = 'banana';
    } else {
      gameState.playerTypes[id] = 'chicken';
    }
  }

  ws.send(JSON.stringify({
    type: 'init',
    state: gameState,
    playerId: id,
    playerType: gameState.playerTypes[id]
  }));

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);

    if (data.type === 'click' && !gameState.gameOver) {
      const idx = data.index;
      const playerType = gameState.playerTypes[id];
      const clickedImage = gameState.board[idx];

      if (
        (playerType === 'chicken' && clickedImage !== 'chicken') ||
        (playerType === 'banana' && clickedImage !== 'banana')
      ) {
        gameState.gameOver = true;
        gameState.winner = playerType === 'chicken' ? 'banana' : 'chicken';
      } else if (!gameState.clickedIndices.includes(idx)) {
        gameState.clickedIndices.push(idx);

        const target = playerType;
        const totalTarget = gameState.board.filter(i => i === target).length;
        const playerClicks = gameState.clickedIndices.filter(i => gameState.board[i] === target).length;
        if (playerClicks === totalTarget) {
          gameState.gameOver = true;
          gameState.winner = playerType;
        }
      }

      clients.forEach(client => {
        if (client.ws.readyState === WebSocket.OPEN) {
          client.ws.send(JSON.stringify({ type: 'update', state: gameState }));
        }
      });
    }

    if (data.type === 'reset') {
      gameState = {
        board: generateBoard(),
        clickedIndices: [],
        playerTypes: gameState.playerTypes,
        gameOver: false,
        winner: null,
      };
      clients.forEach(client => {
        if (client.ws.readyState === WebSocket.OPEN) {
          client.ws.send(JSON.stringify({ type: 'update', state: gameState }));
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected:', id);
    clients = clients.filter(client => client.ws !== ws);
    delete gameState.playerTypes[id];
  });
});

console.log('Server Running');
