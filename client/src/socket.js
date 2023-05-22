// import { io } from 'socket.io-client';
// import GetListOfCoins from './listOfCoinsAPI';
// const socket = io('http://3.8.190.201/coins', {
//         withCredentials: true,
//         extraHeaders : {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//         }
//     });
// function SubscribeToWebSocket() {
//     const listToSub = (JSON.parse(localStorage.getItem("bookmarkList"))).map(elem => ({symbol: elem.symbol}));
//     console.log(listToSub)
    
//   socket.on('connect', () => {
//       console.log('Connected to socket');

//       // Subscribe to events or send data to the server
//       socket.emit('subscribe', listToSub); // Example subscription event
//   });

//   socket.on('subscribed', (data) => {
//       console.log('Subscribed:', data);
//   });

//   socket.on('data:update', (data) => {
//     const listToUpdate = (JSON.parse(localStorage.getItem("bookmarkList")))
//     const index = listToUpdate.findIndex(elem => elem.symbol == data.symbol)
//     listToUpdate[index].price = data.quotes.USD.price;
//     listToUpdate[index].change = data.quotes.USD.percent_change_24h;
//     listToUpdate[index].volume = data.quotes.USD.volume_24h;
//     listToUpdate[index].marketCap = data.quotes.USD.market_cap;
//     localStorage.setItem("bookmarkList",JSON.stringify(listToUpdate))
//     console.log(data)
//   })

//   socket.on('data:price_update', (data) => {
//       console.log(data)
//   })

//   socket.on('error', (err) => {
//       console.log(err)
//   })
// }
// export {socket};
// export default SubscribeToWebSocket;