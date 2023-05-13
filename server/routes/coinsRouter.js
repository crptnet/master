const express = require("express");
const { 
    getCoinList 
} = require("../controllers/coinController");
const router = express.Router();


router.get('/coins', getCoinList)


module.exports = router;