const express = require("express");
const validateToken = require("../middleware/validateToken");
const { addTwoFactorAuthentication, verifyToptCode } = require("../controllers/2faController");
const validateToptToken = require("../middleware/2FAVerification");
const router = express.Router();

router.post('/auth/otpt/create', validateToken, addTwoFactorAuthentication)

router.post('/auth/otpt/verify', validateToken, verifyToptCode)

router.all('/auth/otpt/ping', validateToken, validateToptToken, (req, res, next) => {res.status(200).send({ status : 'success', message : 'pong' }); next()} )
module.exports = router;