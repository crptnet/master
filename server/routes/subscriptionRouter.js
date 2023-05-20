const { 
    createPaymentSession,
    stripeWebhook,
    getSubscription,
} = require("../controllers/subscriptionController");
const router = require("express").Router();
const express = require('express')
const validateToken = require("../middleware/validateToken");
const stripe = require('stripe')(process.env.STRIPE_KEY)
const bodyParser = require('body-parser')

router.post('/create-checkout-session', validateToken, createPaymentSession)

router.post('/stripe_webhook', bodyParser.raw({type: 'application/json'}), stripeWebhook)
  
router.get('/user-subscription', validateToken, getSubscription)

module.exports = router;