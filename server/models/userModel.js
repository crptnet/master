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
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  emailResetToken : {
    type: String,
    required: false,  
    default: 'null' 
  },
  password: {
    type: String,
    required: true
  },
  PasswordResetToken : {
    type: String,
    required: false,
    default: 'null' 
  },
  profilePicture: {
    type: String,
    required: false
  },
  active : {
    type : Boolean,
    required : true,
    default : false
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
