const client = require('../config/connectRedis')
const WebSocket = require('ws')
const socketio = require('socket.io')
const { default: axios } = require('axios')

const updateCoinInfo = (async() => {
    const { data } = await axios('https://api.coinpaprika.com/v1/tickers?quotes=USD,EUR,BTC')

    //console.log(data)

    data.forEach(async coin => {
        const symbolIndex = coin.id.indexOf('-');
        const id = coin.id.substring(symbolIndex + 1);
        //console.log(id)
        try{
            await client.hSet('coins', id, JSON.stringify(coin))
        }
        catch(err){
            console.log(err.message)
        }
    });
})


const updateCoinPrices = (async () => {
    const coinCapSoket = new WebSocket('wss://ws.coincap.io/prices?assets=ALL')

    coinCapSoket.on('message', async (coin) => {
        coin = JSON.parse(coin)
        for(const key in coin){
            try{
                if(!await client.hExists('coins', key)){
                    //console.log(`Coin ${key} does not exist in DB`)
                }
                else if(Math.abs((JSON.parse((await client.hGet('coins', key)))).quotes.USD.price - coin[key]) > 2){
                    //console.log((await client.json.get(key)).quotes.USD.price)  
                    
                    const coin_value = JSON.parse((await client.hGet('coins', key)))

                    
                    coin_value.quotes.USD.price = coin[key]

                    await client.hSet('coins', key, JSON.stringify(coin_value))
                }
            }
            catch(err){
                console.log(key, 
                    coin[key],
                    err.message
                )    
            }
        }
    })

})


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const UpdataInfoRun = (async () =>{
    updateCoinPrices()
    updateCoinInfo()
})


module.exports = {
    UpdataInfoRun,
}