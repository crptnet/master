const io = require('socket.io-client')

const socket = io('http://localhost:5000/coins'); // Replace 'http://localhost:5000' with your server's URL

socket.on('connect', () => {
  console.log('Connected to socket');
  
  // Subscribe to events or send data to the server
  socket.emit('subscribe', ['symbol1', 'symbol2']); // Example subscription event
});

socket.on('subscribed', (data) => {
  console.log('Subscribed:', data);
});

socket.on('error', (err) => {
  console.error('Socket error:', err);
});
