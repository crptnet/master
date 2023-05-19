const { 
    createPaymentSession,
    stripeWebhook,
} = require("../controllers/subscriptionController");
const router = require("express").Router();
const bodyParser = require('body-parser')
const validateToken = require("../middleware/validateToken");

router.post('/create-checkout-session', validateToken, createPaymentSession)

router.post('/stripe_webhook', bodyParser.raw({type: 'application/json'}), stripeWebhook)

module.exports = router;