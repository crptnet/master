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

//router.post('/stripe_webhook', stripeWebhook)

// const endpointSecret = "whsec_96512283aec0430a68da5387729af55a96881e23b579b477fc2d9759d9f456bb";


// router.post('/stripe_webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
//     const sig = req.headers['stripe-signature'];
  
//     console.log(sig)

//     //console.log(req.body.toString())

//     let event;
  
//     try {
//       event = stripe.webhooks.constructEvent(req.body.toString(), sig, endpointSecret);
//     } catch (err) {
//       console.error('Error verifying webhook signature:', err.message);
//       return res.sendStatus(400);
//     }
    
//     res.sendStatus(200);
//   });
  

module.exports = router;