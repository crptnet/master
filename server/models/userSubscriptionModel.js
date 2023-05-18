const mongoose = require('mongoose');

const userSubscriptionModel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    billingId : {
        type : String,
    },
    Plan : {
        type : String,
        enum : ['none', 'tryal', 'basic', 'premium'],
        default : 'none'
    },
    endDate : {
        type : Date,
        default : null
    }     
}, 
{
  timestamps:true, 
});

const userSubscriptions = mongoose.model('userSubscriptions', userSubscriptionModel);

module.exports = {
    userSubscriptions
};
