const asyncHandler = require('express-async-handler')
const client = require('../config/connectRedis')
const { query } = require('express')

const getCoinList = asyncHandler(async (req, res) => {
    var { offset, limit, orderby, symbol, query } = req.query
    !offset ? offset = 0 : null
    !limit ? limit = 2500 : null 
    !symbol ? symbol = 'USD' : null
    !query ? query = '' : null
    
    for (const parameter in req.query) {
      if (Array.isArray(req.query[parameter])) {
        // If the parameter is an array, check its length
        if (req.query[parameter].length > 1) {
          return res.status(400).json({ error: `Parameter '${parameter}' should be provided only once.` });
        }
      }
    }

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
    orderby == 'price_asc' ? data.sort((a, b) => a.quotes[symbol].price - b.quotes[symbol].price) :
    orderby == 'price_desc' ? data.sort((a, b) => b.quotes[symbol].price - a.quotes[symbol].price) :
    orderby == 'volume_24h_asc' ? data.sort((a, b) => a.quotes[symbol].volume_24h - b.quotes[symbol].volume_24h) :
    orderby == 'volume_24h_desc' ? data.sort((a, b) => b.quotes[symbol].volume_24h - a.quotes[symbol].volume_24h) :
    orderby == '24h_change_asc' ? data.sort((a, b) => a.quotes[symbol].percent_change_24h - b.quotes[symbol].percent_change_24h) :
    orderby == '24h_change_desc' ? data.sort((a, b) => b.quotes[symbol].percent_change_24h - a.quotes[symbol].percent_change_24h) :
    orderby == '7d_change_asc ' ? data.sort((a, b) => a.quotes[symbol].percent_change_7d - b.quotes[symbol].percent_change_7d) :
    orderby == '7d_change_desc ' ? data.sort((a, b) => b.quotes[symbol].percent_change_7d - a.quotes[symbol].percent_change_7d) :
    orderby == '1h_change_asc' ? data.sort((a, b) => a.quotes[symbol].percent_change_1h - b.quotes[symbol].percent_change_1h) :
    orderby == '1h_change_desc' ? data.sort((a, b) => b.quotes[symbol].percent_change_1h - a.quotes[symbol].percent_change_1h) :
    orderby == 'marketcap_asc' ? data.sort((a, b) => a.quotes[symbol].market_cap - b.quotes[symbol].market_cap) :
    orderby == 'marketcap_desc' ? data.sort((a, b) => b.quotes[symbol].market_cap - a.quotes[symbol].market_cap) :
    orderby == 'name_asc' ? data.sort((a, b) => {
        const nameA = a.key.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
        const nameB = b.key.toUpperCase();
      
        if (nameA < nameB) {
          return -1; // nameA comes before nameB
        }
      
        if (nameA > nameB) {
          return 1; // nameA comes after nameB
        }
      
        return 0; // names are equal
    }) : 
    orderby == 'name_desc' ? data.sort((a, b) => {
        const nameA = a.key.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
        const nameB = b.key.toUpperCase();
      
        if (nameA < nameB) {
          return 1; // nameA comes before nameB
        }
      
        if (nameA > nameB) {
          return -1; // nameA comes after nameB
        }
      
        return 0; // names are equal
    }) : null
    const lowerCaseQuery = query.toLowerCase();
    data = data.filter((coin) => {
        const lowerCaseSymbol = coin.symbol.toLowerCase();
        const lowerCaseName = coin.name.toLowerCase();
    
        return (
          lowerCaseSymbol.includes(lowerCaseQuery) ||
          lowerCaseName.includes(lowerCaseQuery)
        );
    })

    data = data.slice(offset)
    data = data.slice(0, limit)    


    res.status(200).json(data)
})


module.exports = {
    getCoinList    
}
