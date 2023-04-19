///Deal with handeling API calls related to coins 

const express = require('express');
const router = express.Router();
const coinsController = require('../controllers/coins');

router.get('/', coinsController.getCoins);


module.exports = router;