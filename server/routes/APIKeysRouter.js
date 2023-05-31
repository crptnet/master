const express = require("express");
const validateToken = require("../middleware/validateToken");
const { createAPIKeyPair, getUserKeys, getWallet, deleteKeyPair, getWalletHistory } = require("../controllers/userAPIKeysController");
const router = express.Router();


//#TODO
router.get('/api-account', validateToken, getUserKeys)

router.post('/api-account', validateToken, createAPIKeyPair)

router.delete('/api-account', validateToken, deleteKeyPair)

router.get('/wallet', validateToken, getWallet)

router.get('/wallet-history', validateToken, getWalletHistory)

module.exports = router;