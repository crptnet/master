const asyncHandler = require('express-async-handler')
const user = require('../models/userModel') 
const jwt = require('jsonwebtoken')

///desc Add new coin to the user watch list 
///Route POST /api/watchList/add/
///Request "symbol"
///access private
const addCoin = asyncHandler(async (req, res) => {
    const searchUser = user.findById({user_id: req.user.id})
    if(!searchUser){
        res.status(400).send('Invalid user info');
        throw new Error('Invalid user info')
    }
    console.log(req.body)
    const coin = {
        user_id : req.user.id, 
        coin : req.body.symbol
    }
    searchUser.watchList.push(coin)

    res.status(200).json(searchUser.watchList)
})
///desc Remove coin to the user watch list 
///Route POST /api/watchList/remove/:id
///access private
const removeCoin = asyncHandler(async (req, res) => {

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