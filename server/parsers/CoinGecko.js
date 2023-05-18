const axios = require('axios')
const client = require('../config/connectRedis')

const getCoinsFromGecko = async () => {
    client.hGet('coins').foreach((coin) => {
        


    })


}

function run(){


}


run()