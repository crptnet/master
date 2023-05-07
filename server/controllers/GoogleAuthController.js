const asyncHandler = require('express-async-handler')
const user = require('../models/userModel') 
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const hashUsername = (username) =>{
    const hashLength = 12;
    const hash = crypto.createHash('sha256');
    hash.update(username);
    const hexDigest = hash.digest('hex');
    return hexDigest.substring(0, hashLength);
}


const googleSignIn = asyncHandler(async(req, res) =>{
    const User = (await user.findOne({ email : req.user.email }))

    if(!User){
      var newUser
      if((await user.findOne({ username : req.user.name}))){       
          newUser = new user({ username : hashUsername(req.user.name), email : req.user.email, active : true, profilePicture: 'null' });
          await newUser.save();
      }
      else{
        newUser = new user({ username : req.user.name, email : req.user.email, active : true, profilePicture: 'null' });
        await newUser.save();
      }
      const accessToken = jwt.sign(
        {
          user: {
            username: newUser.username,
            email: newUser.email,
            id: newUser.id
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { 
          expiresIn: "15d" 
      }
      )
      return res.status(200).json({ accessToken }) 
    }
    const accessToken = jwt.sign(
      {
        user: {
          username: User.username,
          email: User.email,
          id: User.id
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { 
        expiresIn: "15d" 
    }
    )
    
    res.status(200).json({ accessToken })  
}
)




module.exports = {
  googleSignIn
}