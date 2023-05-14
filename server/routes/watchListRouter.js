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

router.delete('/watchList/remove', removeCoin)

router.get('/watchList/', getCoin)

module.exports = router
