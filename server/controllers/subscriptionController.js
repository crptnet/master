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
    
    if(customer.subscriptionId !== null && (await stripe.subscriptions.retrieve( customer.subscriptionId )).plan.id === priceId){
      if(customer.active === 'cancelled'){
        return res.status(403).json({ "message" : "Wait till the end of the perid to resubscribe on the same subscription", uri : `http://${process.env.DOMAIN}/settings`})
      }
      return res.status(403).json({ "message" : "User already subscribed to this plan", uri : `http://${process.env.DOMAIN}/settings`})
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
    success_url: `http://${DOMAIN}.nip.io/settings`,
    cancel_url: `http://${DOMAIN}.nip.io/settings`,
  });
  res.status(200).json({ uri : session.url });
})

const endpointSecret = 'whsec_96512283aec0430a68da5387729af55a96881e23b579b477fc2d9759d9f456bb';
const stripeWebhook = asyncHandler(async (req, res) => {
    const payload = req.body;
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

    switch (event.type) {
      case 'checkout.session.completed':
        break;
      case 'customer.subscription.created' : 
        const checkoutSessionCompleted = event.data.object;
        const customerId = checkoutSessionCompleted.customer
        const customer = await userSubscriptions.findOne({ billingId : customerId }) 
        if(customer.subscriptionId && customer.active !== 'cancelled'){
          await stripe.subscriptions.del(customer.subscriptionId)
        }

        await userSubscriptions.findOneAndUpdate({ billingId : customerId }, { subscriptionId : checkoutSessionCompleted.id, endDate : checkoutSessionCompleted.current_period_end, Plan : checkoutSessionCompleted.plan.metadata.plan, active : 'active' })
      break
    }
  
    res.status(200).send();

})

const getSubscription = asyncHandler(async (req, res) => {
    const customer = await userSubscriptions.findById(req.customer)
    if(req.subscription.current_period_end < (new Date).now){
        await customer.updateOne({}, {active : 'expired'})
    }
    const priceId = req.subscription.plan.id
    //return res.send(req.subscription)
    res.send({
        id : req.subscription.id,
        object : req.subscription.object,
        plan : customer.Plan,
        status : customer.active,
        interval : (await stripe.prices.retrieve(priceId)).recurring.interval,
        created : req.subscription.created,
        current_period_end : req.subscription.current_period_end,
        period_ended : Math.floor(Date.now() / 1000) > customer.endDate ? true : false,
        canceled_at : req.subscription.canceled_at,
        cancel_at_period_end : req.subscription.cancel_at_period_end,
        start_date : req.subscription.start_date,
    })
})

const canceleSubscription = asyncHandler(async (req, res) => {
  const customer = (await userSubscriptions.findOne({ user_id : req.user.id }))
  try{
    await stripe.subscriptions.del( customer.subscriptionId )
    res.status(200).json({ message : 'success'})
  }
  catch(err){
    res.status(500).json({ message : err.message})
  }
  await customer.updateOne({ active : 'cancelled' })
})


module.exports = {
    createPaymentSession,
    stripeWebhook,
    getSubscription,
    canceleSubscription,
};

