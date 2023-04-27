const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  coin: {
    type: String,
    required: true,
  },
}, {
  timestamps:true, 
});


//Data schema for User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  watchList : {
    type : [coinSchema],
    required : false
  }
}, 
{
  timestamps:true, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;