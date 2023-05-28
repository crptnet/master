const client = require("./connectRedis");

const onConnection = (io) => {
    io.of('/coins').on("connection", (socket) => {
      console.log(`connected with id: ${socket.id}`);
  
      socket.on('subscribe', (data) => {
        if (!Array.isArray(data)) {
          socket.emit('error', { message: 'Invalid data format' });
          return;
        }
        
        //console.log(new Date().toLocaleTimeString(), ': Received socket ID:', socket.id, 'data', data);
        try {
          data.forEach((key) => {
            if (key['symbol'] === undefined) {
              // Invalid object format
              socket.emit('error', { message: `Invalid object format ${JSON.stringify(key)}` });
            } else {
              socket.join(key.symbol);
              socket.emit('subscribed', { message: `subscribed on ${key.symbol}` });
            }
          });
        } catch (err) {
          socket.emit('error', { message: err });
        }
      });
  
      socket.on('unsubscribe', (data) => {
        if (!Array.isArray(data)) {
          socket.emit('error', { message: 'Invalid data format' });
          return;
        }
  
        try {
          data.forEach((key) => {
            if (key['symbol'] === undefined) {
              // Invalid object format
              socket.emit('error', { message: `Invalid object format ${JSON.stringify(key)}` });
            } else {
              socket.leave(key.symbol);
              socket.emit('unsubscribed', { message: `unsubscribed on ${key.symbol}` });
            }
          });
        } catch (err) {
          socket.emit('error', { message: err });
        }
      });
    });
  };
  
  module.exports = onConnection;
  