const axios = require('axios');
const client = require('../config/connectRedis');

const getCoinsFromGecko = async () => {
    var data = []
    const hashValues = await client.hGetAll('coins');
    const objectsArray = Object.entries(hashValues).map(([key, value]) => ({
        key,
        ...JSON.parse(value),
    }));
    data = objectsArray
    console.log(data.length)
    var i = 0
    data.forEach(async (coin) => {
        if(i > 10){
            return
        }
        const resCoin = await axios(`https://api.coingecko.com/api/v3/coins/${coin.name}`);
        console.log(resCoin.name);
        i++        
    });
};

(function run() {
  getCoinsFromGecko();
})();
