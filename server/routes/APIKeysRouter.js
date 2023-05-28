const express = require("express");
const validateToken = require("../middleware/validateToken");
const { createAPIKeyPair, getUserKeys, getWallet } = require("../controllers/userAPIKeysController");
const router = express.Router();


//#TODO
router.get('/api-account', validateToken, getUserKeys)


router.post('/api-account', validateToken, createAPIKeyPair)

router.get('/wallet', validateToken, getWallet)


module.exports = router;