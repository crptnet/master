const mongoose = require('mongoose');

const userSubscriptionModel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    subscriptionId : {
        type : String,
        require : false,
        default : null,
    },
    billingId : {
        type : String,
    },
    Plan : {
        type : String,
        enum : ['trial', 'basic', 'premium', 'cancelled', 'expired'],
        default : 'trial'
    },
    active : {
        type : String,
        enum : ['active', 'cancelled'],
        default : 'active'
    },
    endDate : {
        type : Number,
        default : null,
    }     
}, 
{
  timestamps:true, 
});

const userSubscriptions = mongoose.model('userSubscriptions', userSubscriptionModel);

module.exports = userSubscriptions
