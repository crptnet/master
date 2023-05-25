const asyncHandler = require('express-async-handler')
const User = require('../models/userModel') 

///desc Add new coin to the user watch list 
///Route POST /api/watchList/add/
///Request "symbol"
///access private
const addCoin = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
  
    if (!user) {
      res.status(400).send('Invalid user info');
      throw new Error('Invalid user info');
    }

    const { symbol } = req.body

    if(user.watchList && user.watchList.find(coin => coin.coin_id == symbol)){
      return res.status(403).json({ message : 'User alredy added this coin'})
    }

    const newCoin = {
      user_id: userId,
      coin_id: symbol
    };
    user.watchList = []
    user.watchList.push(newCoin);
    const updatedUser = await user.save();
  
    res.status(200).json(updatedUser.watchList);
  });
  
///desc Remove coin to the user watch list 
///Route POST /api/watchList/remove/:id
///access private
const removeCoin = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);
  
    if (!user) {
      res.status(400).send('Invalid user info');
      throw new Error('Invalid user info');
    }
  
    const { symbol } = req.body;
    console.log(symbol)
    if(!user.watchList || !user.watchList.find(coin => coin.coin_id === symbol)){
        res.status(400).send('Invalid coin info');
        throw new Error('Invalid coin info');      
    }

    user.watchList = user.watchList.filter(coin => coin.coin_id !== symbol);
    await user.save();
  
    console.log(user);
    
    res.status(200).json(user.watchList);
})
///desc Remove coin to the user watch list 
///Route POST /api/watchList/
///access private
const getCoin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    res.status(200).json(user.watchList)
})




module.exports = {
    addCoin,
    removeCoin,
    getCoin
}