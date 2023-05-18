const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique : true,
  },
  coin_id: {
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
  },
  password: {
    type: String,
    required: false,
  },
  googleActive: {
    type: Boolean,
    required: false,  // add new field for Google ID
    default : false,
  },
  PasswordResetToken : {
    type: String,
    required: false,
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
