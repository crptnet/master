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
  },
  password: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: false,  // add new field for Google ID
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
