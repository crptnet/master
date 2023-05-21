const userSubscriptions = require('../models/userSubscriptionModel')
const stripe = require('stripe')(process.env.STRIPE_KEY)

const subscriptionValidation = async (req, res, next) => {
    const customer = (await userSubscriptions.findOne({ user_id : req.user.id }))
    if(!customer){
        return res.status(500).json({ message : 'Customer not found'})
    }

    console.log(customer.endDate)

    if(!customer.subscriptionId){
        return res.status(200).json({
            id : null,
            object : null,
            plan : customer.Plan,
            created : customer.createdAt,
            current_period_end : customer.endDate,
            period_ended : Math.floor(Date.now() / 1000) > customer.endDate ? true : false, 
        })
    }
    const subscription = await stripe.subscriptions.retrieve(customer.subscriptionId)

    console.log(subscription)

    req.subscription = subscription
    next()
}

module.exports = {
    subscriptionValidation,
}