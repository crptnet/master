const express = require('express')
const router = express.Router()
const {  
    addCoin,
    removeCoin,
    getCoin
} = require('../controllers/watchListController')
const validateToken = require('../middleware/validateToken')

router.post('/watchList/add', validateToken, addCoin)

router.delete('/watchList/remove', validateToken, removeCoin)

router.get('/watchList/', validateToken, getCoin)

module.exports = router
