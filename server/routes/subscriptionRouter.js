const { 
    createPaymentSession,
    stripeWebhook,
    getSubscription,
    canceleSubscription,
} = require("../controllers/subscriptionController");
const {
    subscriptionValidation
} = require('../middleware/subscriptionValidation')
const router = require("express").Router();
const validateToken = require("../middleware/validateToken");
const bodyParser = require('body-parser')

router.post('/create-checkout-session', validateToken, createPaymentSession)

router.post('/stripe_webhook', bodyParser.raw({type: 'application/json'}), stripeWebhook)
  
router.get('/user-subscription', validateToken, subscriptionValidation, getSubscription)

router.delete('/subscription-delete', validateToken, canceleSubscription)
module.exports = router;