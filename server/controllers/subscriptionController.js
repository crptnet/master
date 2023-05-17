// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_KEY)
const YOUR_DOMAIN = process.env.DOMAIN
const asyncHandler = require('express-async-handler')

const createPaymentSession = asyncHandler(async (req, res) => {
    const { priceId } = req.query
    console.log(priceId)
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

const stripeWebhook = asyncHandler(async (req, res) => {

    const payload = request.body;

    console.log("Got payload: " + payload);
  
    response.status(200).end();

})



module.exports = {
    createPaymentSession,
    stripeWebhook,
};

