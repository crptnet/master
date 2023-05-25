const express = require("express");
const validateToken = require("../middleware/validateToken");
const { createAPIKeyPair } = require("../controllers/userAPIKeysController");
const router = express.Router();


//#TODO
router.get('/account', validateToken)


router.post('/api-account', validateToken, createAPIKeyPair)



module.exports = router;