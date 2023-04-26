const mongoose = require('mongoose');

//Data schema for User
const coinSchema = new mongoose.Schema({
    user_id : {
        id : mongoose.Schema.Types.ObjectId,
        required : true
    },
    coin : {
        type : String,
        required: true
    }
}, 
{
  timestamps:true, 
});

const UserWatchList = mongoose.model('UserWatchList', coinSchema);

module.exports = UserWatchList;
