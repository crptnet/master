import { io } from 'socket.io-client';
import GetListOfCoins from './listOfCoinsAPI';

export default async function SubscribeToWebSocket() {
    const listOfCoins = await GetListOfCoins(2500,0);
  const listOfNames = listOfCoins.map(elem => ({ symbol: elem.symbol }));
  const socket = io('http://3.8.190.201/coins', {
      withCredentials: true,
      extraHeaders : {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
  });

  socket.on('connect', () => {
      console.log('Connected to socket');

      // Subscribe to events or send data to the server
      socket.emit('subscribe', listOfNames); // Example subscription event
      //socket.emit('data:update', listOfNames);
      //socket.emit('data:price_update', listOfNames);
  });

  socket.on('subscribed', (data) => {
      //console.log('Subscribed:', data);
  });

  socket.on('data:update', (data) => {
      console.log(data)
  })

  socket.on('data:price_update', (data) => {
      console.log(data)
  })

  socket.on('error', (err) => {
      console.log(err)
  })
}