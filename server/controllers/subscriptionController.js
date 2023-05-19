// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_KEY)
const DOMAIN = process.env.DOMAIN
const asyncHandler = require('express-async-handler')
const userSubscriptions = require('../models/userSubscriptionModel')
const { buffer } = require('micro')


const createPaymentSession = asyncHandler(async (req, res) => {
    const { priceId } = req.query
    const customerID = (await userSubscriptions.findOne({ user_id : req.user.id })).billingId

    console.log(customerID)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1N8Sq2Jja6fn3xLGLkkO55uF',
          quantity: 1,
        },
      ],
    customer: customerID,
    mode: 'subscription',
    success_url: `${DOMAIN}/subscription?success=true`,
    cancel_url: `${DOMAIN}/subscription?canceled=true`,
  });

  res.redirect(200, session.url);
})

const endpointSecret = "whsec_10s1R8QjmskZYkVoroWiHCMkBMB4maPC";


const stripeWebhook = asyncHandler(async (req, res) => {
    const payload = req.body;

    console.log(payload)

    const sig = req.headers['stripe-signature'];

    let event;

    try 
    {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } 
    catch (err) 
    {
      res.status(400).send(`Webhook Error: ${err.message}`);
      console.log('Error message', err.message)
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.async_payment_failed':
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case 'checkout.session.async_payment_succeeded':
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case 'checkout.session.completed':
        console.log((new Date).toLocaleTimeString(), payload)
        const checkoutSessionCompleted = event.data.object;
        const subscription = checkoutSessionCompleted.subscription
        const customer = checkoutSessionCompleted.customer
        await userSubscriptions.findOneAndUpdate({ billingId : customer }, { subscriptionId : subscription })
        break;
      case 'checkout.session.expired':
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        break;
      // ... handle other event types
      default:
        //console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 res to acknowledge receipt of the event
    res.status(200).send();

})

const getSubscription = asyncHandler(async (res, req) => {
  // const subscription = await stripe.subscriptions.retrieve(

  // )



})

module.exports = {
    createPaymentSession,
    stripeWebhook,
};

