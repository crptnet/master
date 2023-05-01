const asyncHandler = require('express-async-handler')
const user = require('../models/userModel') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path')
const nodemailer = require('nodemailer')

// Create a nodemailer transporter object with your email service provider settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

const fileFilterMiddleware = require('../middleware/multerHandler')
const multer = require('multer')
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
        fileSize: 108*1024,
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

///desc Register a user
///Route POST /api/register
///access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password || password.length > 72){
        res.status(400).json({ message: 'Invalid user info'})
        throw new Error('Invalid user info')
    }
    //Email pattern check
    if(!isEmail(email)){
      res.status(400).json({ message: 'Invalid email'})
      throw new Error('Invalid email')
    }

    //Password pattern check
    if(!isValidPassword(password)){
      res.status(400).json({ message: 'Invalid password'})
      throw new Error('Invalid password')
    }

    //Username length check
    if(username.length < 3){
      res.status(400).json({ message: 'Username must be at least 3 characters long'})
      throw new Error('Username must be at least 3 characters long')  
    }

    //Check if user with the same email exists
    if(await user.findOne({ email })){
        res.status(409).json({ message: 'User already taken'})
        throw new Error('User already taken')
    }
    
    //Check if user with the same username exists
    if(await user.findOne({ username })){
      res.status(409).json({ message: 'Username already taken'})
      throw new Error('Username already taken')
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const newUser = new user({ username, email, password: hashPassword, active : false, profilePicture: 'null' });
    await newUser.save();


    const emailMessage = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verify your email address',
      html: `<p>Please click <a href="http://localhost:3000/activate?key=${hashPassword}&id=${newUser.id}">here</a> to verify your email address.</p>`
    };
    
    
    if(newUser){
      transporter.sendMail(emailMessage, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.status(201).json({ 'email' : email, 'id' : newUser.id})
    }

    res.status(500).send()
})
///desc Login a user
///Route POST /api/login
///access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({message: ("All fields are mandatory!")})
      throw new Error("All fields are mandatory!")
    }

    const searchUser = await user.findOne({ email });
    
    //compare password with hashedpassword
    
    console.log(searchUser.active)

    if (searchUser && (await bcrypt.compare(password, searchUser.password))) {
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
      );


      res.status(200).json({ accessToken });
    } 
    
    else 
    {
      res.status(401).json({message: ("email or password is not valid")});
      throw new Error("email or password is not valid");
    }

  });

///desc Get current user
///Route GET /api/current
///access private
const getUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });

///desc Delete User
///Route DELETE /api/delete
///access private
const deleteUser = asyncHandler(async (req, res) => {
  const User = await user.findById(req.user.id)
  if(!User){
    res.status(404).json({message: ('User not found')});
    throw new Error('User not found')
  }
  
  if(User.profilePicture !== 'null'){
    try{
      fs.unlink(User.profilePicture);  
    }
    catch{
      console.log('Picture not found')
    }
  }
  
  await User.deleteOne()
  res.status(200).json(req.user)

})

// Get user info to display on password reset UI
// Route GET api/email-active
// access public
const getUserInfoForActivation = asyncHandler(async (req, res) =>{
  const User = await user.findById(req.query.id)
  if(!User || User.pasьsword !== req.query.key){
    res.status(404).json({message: ('User not found')});
    throw new Error('User not found')
  }
  
  res.status(200).json(
    {
      email : User.email,
    }
  )

})


//Activate user
//Route PUT api/activate/:key/:id:
//Access Public
const updateActiveStatus = asyncHandler(async (req, res) =>{
  const User = await user.findById(req.query.id)
  if(!User || User.pasьsword !== req.query.key){
    res.status(404).json({message: ('User not found')});
    throw new Error('User not found')
  }
  
  await User.updateOne({ active : true })

  res.status(200).json('User activated')
})

/// desc update user  info
/// Route PUT api/updateUser
/// Access private
const updateUserInfo = asyncHandler(async (req, res) =>{
  const User = await user.findById(req.user.id)
  if(req.body.newUsername){
    await User.updateOne({ username : req.body.newUsername })
  }

  if(req.body.newPassword){
    await User.updateOne({ username : req.body.newPassword })
  }

})




///desc Set profile Picture to the user
///Route POST /api/profilePicture
///access private
const setProfilePicture = asyncHandler(async (req, res) => {
  console.log(req.file)
  const User = await user.findById(req.user.id)
  if(User.profilePicture === 'null'){
    await User.updateOne({ profilePicture : req.file.path})
  }
  else{
    try{
      fs.unlink(User.profilePicture, (err) => {
        if (err) throw err;
        console.log('File deleted successfully');
      });  
    }
    catch{
      console.log('File has not been found')
    }
    await User.updateOne({ profilePicture : req.file.path})  
  }
  res.status(200).json('success')
});

///desc DELETE profile Picture to the user
///Route DELETE /api/profilePicture
///access private
const deleteProfilePicture = asyncHandler(async (req, res) =>{
  const User = await user.findById(req.user.id)
  if(!User){
    res.status(400).json({message: ('User is not authorized')})
    throw new Error('User is not authorized')
  }
  if(User.profilePicture === 'null'){
    await User.updateOne({ profilePicture : req.file.path})
  }
  else{
    try{
      fs.unlink(User.profilePicture, (err) => {
        if (err) throw err;
        console.log('File deleted successfully');
      });  
    }
    catch{
      console.log('File has not been found')
    }
    await User.updateOne({ profilePicture : 'null'})  
  }
  res.status(200).json('success')

});

///desc GET profile Picture to the user
///Route GET /api/profilePicture
///access private
const getProfilePicture = asyncHandler(async (req, res) =>{
  const User = await user.findById(req.user.id)
  if(!User){
    res.status(400).json({message: ('User is not authorized')})
    throw new Error('User is not authorized')
  }
  const imagePath = path.join(__dirname, '../', User.profilePicture);
  console.log(imagePath)
  res.status(200).sendFile(imagePath)
});
///desc GET profile Picture to the user
///Route GET /api/profilePicture/:username
///access public
const getProfilePictureByUserName = asyncHandler(async (req, res) =>{
  const User = await user.findOne({ username : req.params.username} )
  if(!User){
    res.status(404).json({message: ('Not found')})
    throw new Error('Not found')
  }
  const imagePath = path.join(__dirname, '../', User.profilePicture);
  res.status(200).sendFile(imagePath)
});

module.exports = {
    registerUser,
    getUserInfoForActivation,
    loginUser,
    getUser,
    getProfilePicture,
    deleteUser,
    setProfilePicture,
    getProfilePictureByUserName,
    deleteProfilePicture,
    updateActiveStatus
}