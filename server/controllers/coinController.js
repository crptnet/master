const asyncHandler = require('express-async-handler')
const client = require('../config/connectRedis')

const getCoinList = asyncHandler(async (req, res) => {
    var { offset, limit, orderby, symbol } = req.query
    const keys = await client.keys('*')
    console.log(orderby)
    !offset ? offset = 0 : null
    !limit ? limit = 2500 : null 
    var data = []
    try 
    {
        const hashValues = await client.hGetAll('coins');
        const objectsArray = Object.entries(hashValues).map(([key, value]) => ({
            key,
            ...JSON.parse(value),
        }));
        data = objectsArray
    } 
    catch (err) 
    {
        console.error(err);
    }
    
    !orderby ? orderby = 'rank_asc' : null
    orderby == 'rank_asc' ? data.sort((a, b) => a.rank - b.rank) :
    orderby == 'rank_desc' ? data.sort((a, b) => b.rank - a.rank) : 
    orderby == 'price_asc' ? data.sort((a, b) => a.quotes.USD.price - b.quotes.USD.price) :
    orderby == 'price_desc' ? data.sort((a, b) => b.quotes.USD.price - a.quotes.USD.price) :
    orderby == 'volume_24h_asc' ? data.sort((a, b) => a.quotes.USD.volume_24h - b.quotes.USD.volume_24h) :
    orderby == 'volume_24h_desc' ? data.sort((a, b) => b.quotes.USD.volume_24h - a.quotes.USD.volume_24h) :
    orderby == '24h_change_asc' ? data.sort((a, b) => a.quotes.USD.percent_change_24h - b.quotes.USD.percent_change_24h) :
    orderby == '24h_change_asc' ? data.sort((a, b) => b.quotes.USD.percent_change_24h - a.quotes.USD.percent_change_24h) :
    orderby == '7d_change_asc ' ? data.sort((a, b) => a.quotes.USD.percent_change_7d - b.quotes.USD.percent_change_7d) :
    orderby == '7d_change_asc ' ? data.sort((a, b) => b.quotes.USD.percent_change_7d - a.quotes.USD.percent_change_7d) :
    orderby == '1h_change_asc' ? data.sort((a, b) => a.quotes.USD.percent_change_1h - b.quotes.USD.percent_change_1h) :
    orderby == '1h_change_asc' ? data.sort((a, b) => b.quotes.USD.percent_change_1h - a.quotes.USD.percent_change_1h) :
    
    
    data = data.slice(offset)

    data = data.slice(0, limit)
    

    res.status(200).json(data)
})


module.exports = {
    getCoinList    
}
