const express = require("express");
const validateToken = require("../middleware/validateToken");
const { createAPIKeyPair, getUserKeys } = require("../controllers/userAPIKeysController");
const router = express.Router();


//#TODO
router.get('/api-account', validateToken, getUserKeys)


router.post('/api-account', validateToken, createAPIKeyPair)



module.exports = router;