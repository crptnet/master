const express = require("express");
const { 
    getCoinList 
} = require("../controllers/coinController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();


router.get('/coins', getCoinList, validateToken, getCoinList)


module.exports = router;