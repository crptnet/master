const client = require('../config/connectRedis')
const WebSocket = require('ws')
const { default: axios } = require('axios')

const updateCoinInfo = (async(io) => {
    const res = await axios('https://api.coinpaprika.com/v1/tickers?quotes=USD,EUR,BTC', {
        method : 'GET'
    }).catch((err) => {
        console.log((new Date).toLocaleTimeString(), 'failed to fetch coin data for api with message', err.message)
        throw new Error('failed to fetch')
    })

    const data = res.data
    if(res.status != 200){
        console.log((new Date).toLocaleTimeString(), res.error)
        return
    }
    data.forEach(async coin => {
        if(coin.quotes.USD.market_cap != 0){
            if(coin.symbol)
            {
                try{
                    io.to(coin.symbol).emit('data:update', coin)
                }
                catch(err){
                    console.log(err.message)
                }
            }
            
            const symbolIndex = coin.id.indexOf('-');
            const id = coin.id.substring(symbolIndex + 1);
            coin['icon'] = `http://${process.env.DOMAIN}/coin-icon/${coin.symbol}.png`
            await client.hSet('coins', id, JSON.stringify(coin)).catch((err) => {
                console.log((new Date).toLocaleTimeString(), err.message)
            })
        }
        
    });
    console.log((new Date).toLocaleTimeString(),`: updated coin data from api.coinpaprika.com with status ${res.status}`)
})


const updateCoinPrices = (async (io) => {
    var coinCapSoket
    try{
        coinCapSoket = new WebSocket('wss://ws.coincap.io/prices?assets=ALL')
    }
    catch(err){
        console.log(err.message)
    }
    coinCapSoket.on('message', async (coin) => {
        coin = JSON.parse(coin)
        for(const key in coin){
            if(!await client.hExists('coins', key)){
                //console.log(`Coin ${key} does not exist in DB`)
            }
            else if(Math.abs((JSON.parse((await client.hGet('coins', key)))).quotes.USD.price - coin[key]) > 2){
                const coin_value = JSON.parse((await client.hGet('coins', key)))
                coin_value.quotes.USD.price = coin[key]
                io.to(coin_value.symbol).emit('data:price_update', { [coin_value.symbol] : coin[key] })
                
                await client.hSet('coins', key, JSON.stringify(coin_value))
            }
        }
    })

})

const updateCoinData = async (io) => {
    while (true) {
      try {
        await updateCoinInfo(io); 
        await delay(60000*5);// 5 min
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }
  
  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const UpdataInfoRun = (async (io) =>{
    updateCoinPrices(io)
    updateCoinData(io)
})



module.exports = {
    UpdataInfoRun,
}