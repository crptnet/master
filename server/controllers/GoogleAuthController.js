const asyncHandler = require('express-async-handler')
const user = require('../models/userModel') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path')
const nodemailer = require('nodemailer')
const crypto = require('crypto');

const {
    setProfilePicture
} = require('./userController')

// Create a nodemailer transporter object with your email service provider settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

const fileFilterMiddleware = require('../middleware/multerHandler')
const multer = require('multer');
const { decode } = require('punycode');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
  })
const upload = multer({ 
    storage : storage,
    limits:{
        fileSize: 8*1024*1024,
    },
    fileFilter : fileFilterMiddleware
    
})


function isEmail(str) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
}



const googleSignIn = asyncHandler(async(req, res) =>{
    const User = await user.findOne({ email : req.user.email })

    if(!User){
        if((await user.findOny({ username : req.user.name}))){
          const hashLength = 12;
          const hash = crypto.createHash('sha256');
          hash.update(req.user.name);
          const hexDigest = hash.digest('hex');
          const truncatedName = hexDigest.substring(0, hashLength);
          const newUser = new user({ username : truncatedName, email : req.user.email, active : req.user.email_verified, profilePicture: req.user.picture });
          await newUser.save();
        }
        else{
          const newUser = new user({ username : req.user.name, email : req.user.email, active : req.user.email_verified, profilePicture: req.user.picture });
          await newUser.save();
        }

      }
      
    const accessToken = jwt.sign(
      {
        user: {
          username: searchUser.username,
          email: searchUser.email,
          id: searchUser.id
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15d" }
    )
    res.status(200).json({ accessToken })  
}
)




module.exports = {
  googleSignIn
}