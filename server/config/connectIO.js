const sio = require('socket.io');
const asyncHandler = require('express-async-handler')
module.exports = asyncHandler((server) => {
    const io = sio(server);
    io.on('connection', (socket) =>{
      socket.on('subscribe', (data) => {
            console.log((new Date).toLocaleTimeString(),': Received socket ID:', socket.id, 'data', data)
            socket.join(data)
            socket.emit( 'subscribed', { message : `subscribed on ${JSON.stringify(data)}` })
      });
      socket.on("error", (err) => {
          if (err && err.message === "unauthorized event") {
            socket.disconnect();
          }
        });

    })

    return {
        register: (namespace)=> {
        let nsp = io.of(namespace);
        nsp.on('connect', function(socket) {
            console.log((new Date).toLocaleTimeString(),'connected id:',socket.id)    
        })
        }
    }
})