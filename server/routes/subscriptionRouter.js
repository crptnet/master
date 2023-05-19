const { 
    createPaymentSession,
    stripeWebhook,
} = require("../controllers/subscriptionController");
const router = require("express").Router();
const express = require('express')
const validateToken = require("../middleware/validateToken");
const stripe = require('stripe')(process.env.STRIPE_KEY)
const bodyParser = require('body-parser')

router.post('/create-checkout-session', validateToken, createPaymentSession)

router.post('/stripe_webhook', stripeWebhook)
  

module.exports = router;