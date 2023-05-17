const { 
    createPaymentSession,
    stripeWebhook,
} = require("../controllers/subscriptionController");
const router = require("express").Router();
const bodyParser = require('body-parser')
const express = require('express')

router.post('/create-checkout-session', createPaymentSession)

router.post('/stripe_webhook', express.raw({type: 'application/json'}), stripeWebhook)

module.exports = router;