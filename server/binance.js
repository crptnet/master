const ws = require('ws')

const main = () => {
    const socket = new ws('wss://push.coinmarketcap.com/ws?device=web&client_source=home_page');

    socket.addEventListener('open', () => {
      const initialMessage = JSON.stringify({
        method: 'RSUBSCRIPTION',
        params: ['main-site@crypto_price_15s@{}@normal', '1,1027,825,1839,3408,52,2010,74,3890,5426,1958,2,6636,4687,5994,5805,4943,3717,1975,3957,3794,7083,328,3897,1321,512,11419,1831,8916,2563,2280,8000,21794,4642,3635,11841,6535,3077,3155,18876,4030,6719,6210,3330,1765,5690,7278,3513,11221,2943,7334,6892,1966,2416,2011,4847,6783,4558,1376,19891,2087,4066,6538,10603,3602,2586,1518,4846,4256,16086,3306,24478,1720,5899,20947,7226,11840,1437,2502,8646,4705,4172,6953,10791,11857,131,4269,5964,2634,7950,1934,4157,2694,7501,2469,2424,8536,9903,2130,10804,1,1027,2010,1839,6636,52,1975,2,512,1831,7083,74,9023,9022,5824,6783,11841,11840'],
      });
      
      socket.send(initialMessage);
    });
    
    socket.addEventListener('message', (event) => {
      const message = event.data;
      console.log('Received message:', message);
    });
    
    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });
    
    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });
    
}
main()