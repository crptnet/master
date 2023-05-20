// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_KEY)
const DOMAIN = process.env.DOMAIN
const asyncHandler = require('express-async-handler')
const userSubscriptions = require('../models/userSubscriptionModel')
const { buffer } = require('micro')

const options = ['price_1N8Sq2Jja6fn3xLGLkkO55uF', 'price_1N8Sq2Jja6fn3xLG8OzFJugh', 'price_1N8oE5Jja6fn3xLGAMtu7XlC', 'price_1N8oE5Jja6fn3xLGKWrRKw5Z']

const createPaymentSession = asyncHandler(async (req, res) => {
    const { option } = req.query
    const priceId = options[option - 1] 
    if(!priceId){
      return res.status(403).json({ message : 'not valid option', uri : `http://${process.env.DOMAIN}/settings` })
    }

    const customer = (await userSubscriptions.findOne({ user_id : req.user.id }))
    console.log(customer.subscriptionId !== null)
    if((customer.subscriptionId !== null && await stripe.subscriptions.retrieve(customer.subscriptionId)).plan?.id === priceId){
      return res.json({ "message" : "User already subscribed to this plan", uri : `http://${process.env.DOMAIN}/settings`}).status(403)
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
    customer: customer.billingId,
    mode: 'subscription',
    success_url: `http://${DOMAIN}/settings`,
    cancel_url: `http://${DOMAIN}/settings`,
  });
  res.status(200).json({ uri : session.url });
})

//local secret
const endpointSecret = "whsec_96512283aec0430a68da5387729af55a96881e23b579b477fc2d9759d9f456bb";


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
      case 'checkout.session.completed':
        console.log((new Date).toLocaleTimeString(), payload)
        const checkoutSessionCompleted = event.data.object;
        const subscription = checkoutSessionCompleted.subscription
        const customer = checkoutSessionCompleted.customer
        await userSubscriptions.findOneAndUpdate({ billingId : customer }, { subscriptionId : subscription })
        break;
      default:
        //console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 res to acknowledge receipt of the event
    res.status(200).send();

})

const getSubscription = asyncHandler(async (req, res) => {
  const customer = (await userSubscriptions.findOne({ user_id : req.user.id }))

  if(!customer.subscriptionId){
    return res.json({ message : 'user does not have any subscription'}).status(400).end()
  }
  const subscription = await stripe.subscriptions.retrieve(
    customer.subscriptionId
  )

  res.send({
    id : subscription.id,
    object : subscription.object,
    created : subscription.created,
    current_period_end : subscription.current_period_end,
  }).status(200)

})

module.exports = {
    createPaymentSession,
    stripeWebhook,
    getSubscription,
};

