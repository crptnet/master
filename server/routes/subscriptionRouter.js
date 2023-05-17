const { 
    createPaymentSession,
    stripeWebhook,
} = require("../controllers/subscriptionController");
const router = require("express").Router();
const bodyParser = require('body-parser')

router.post('/create-checkout-session', createPaymentSession)

router.post('/stripe_webhooks', bodyParser.raw({type: 'application/json'}), stripeWebhook)

module.exports = router;