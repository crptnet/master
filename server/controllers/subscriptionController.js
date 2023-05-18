// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_KEY)
const YOUR_DOMAIN = process.env.DOMAIN
const asyncHandler = require('express-async-handler')

const createPaymentSession = asyncHandler(async (req, res) => {
    const { priceId } = req.query
    const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1N8Sq2Jja6fn3xLGLkkO55uF',
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${YOUR_DOMAIN}/subscription?success=true`,
    cancel_url: `${YOUR_DOMAIN}/subscription?canceled=true`,
  });

  res.redirect(200, session.url);
})

const endpointSecret = "whsec_96512283aec0430a68da5387729af55a96881e23b579b477fc2d9759d9f456bb";


const stripeWebhook = asyncHandler(async (req, res) => {
    
    const payload = req.body;

    console.log("Got payload: ", payload);
  
    //res.status(200).end();

    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
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
        const checkoutSessionCompleted = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        break;
      case 'checkout.session.expired':
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 res to acknowledge receipt of the event
    res.status(200).send();

})



module.exports = {
    createPaymentSession,
    stripeWebhook,
};

