const express = require('express')
const router = express.Router()
const {  
    addCoin,
    removeCoin,
    getCoin
} = require('../controllers/watchListController')
const validateToken = require('../middleware/validateToken')

router.use(validateToken)

router.post('/watchList/add', addCoin)

router.post('/watchList/remove', removeCoin)

router.post('/watchList/', getCoin)

module.exports = router
