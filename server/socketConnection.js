const io = require('socket.io-client')

const socket = io('http://3.8.56.163/coins'); // Replace 'http://localhost:5000' with your server's URL

socket.on('connect', () => {
  console.log('Connected to socket');
  
  // Subscribe to events or send data to the server
  socket.emit('subscribe', [
    { 
        "symbol" : "BTC" 
    },
    {
        "symbol" : "ETH"
    }
]); // Example subscription event
});

socket.on('subscribed', (data) => {
  console.log('Subscribed:', data);
});

socket.on('error', (err) => {
  console.error('Socket error:', err);
});

socket.on('data:update', (data) => {
    console.log(data)
})


socket.on('data:price_update', (data) => {
    console.log(data)
})