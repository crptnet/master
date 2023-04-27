const asyncHandler = require('express-async-handler')
const User = require('../models/userModel') 
const jwt = require('jsonwebtoken')

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
  
    const newCoin = {
      user_id: userId,
      coin: req.body.symbol
    };
  
    user.watchList.push(newCoin);
    const updatedUser = await user.save();
  
    console.log(updatedUser);
  
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
  
    const newCoin = {
      user_id: userId,
      coin: req.body.symbol
    };
  
    user.watchList.push(newCoin);
    const updatedUser = await user.save();
  
    console.log(updatedUser);
  
    res.status(200).json(updatedUser.watchList);
})
///desc Remove coin to the user watch list 
///Route POST /api/watchList/
///access private
const getCoin = asyncHandler(async (req, res) => {
    res.status(200).json(user.find({ user_id: req.user.id }).watchList)
})




module.exports = {
    addCoin,
    removeCoin,
    getCoin
}