const asyncHandler = require('express-async-handler')
const user = require('../models/userModel') 
const userSubscriptions = require('../models/userSubscriptionModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path')
const nodemailer = require('nodemailer')
const stripe = require('stripe')(process.env.STRIPE_KEY)


// DO NOT TOUCH IT JUST WORKS
// DO NOT TOUCH IT JUST WORKS
// DO NOT TOUCH IT JUST WORKS
// DO NOT TOUCH IT JUST WORKS
// DO NOT TOUCH IT JUST WORKS
// DO NOT TOUCH IT JUST WORKS
// DO NOT TOUCH IT JUST WORKS
// DO NOT TOUCH IT JUST WORKS
// DO NOT TOUCH IT JUST WORKS
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

///desc Register a user
///Route POST /api/register
///access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password || password.length > 72){
      return res.status(400).json({ message: 'Invalid user info'})
    }
    //Email pattern check
    if(!isEmail(email)){
      return res.status(400).json({ message: 'Invalid email'})
    }

    //Password pattern check
    if(!isValidPassword(password)){
      return res.status(400).json({ message: 'Invalid password'})
    }

    //Username length check
    if(username.length < 3){
      return res.status(400).json({ message: 'Username must be at least 3 characters long'})
    }

    //Check if user with the same email exists
    const tryUser = await user.findOne({ email }) 
    if(tryUser){
      if(tryUser.email === email){
        return res.status(409).json({ message: 'Email already taken'})    
      }  
      else if(tryUser.username === username){
        return res.status(409).json({ message: 'User already taken'})
      }
      return res.status(409).json({ message: 'Conflict'})
    }
    
    //Check if user with the same username exists
    if(await user.findOne({ username })){
      return res.status(409).json({ message: 'Username already taken'})
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const newUser = new user({ username, email, password: hashPassword, active : false, profilePicture: 'null', watchList : null });
    await newUser.save();


    const emailMessage = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verify your email address',
      html: `<p>Please click <a href="http://${process.env.DOMAIN}/activate?key=${hashPassword}&id=${newUser.id}">here</a> to verify your email address.</p>`
    };
    
    
    if(newUser){
      transporter.sendMail(emailMessage, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      //
      //Billing
      //

      userBill(newUser)


      return res.status(201).json({ 'email' : email, 'id' : newUser.id})
    }

    res.status(500).send()
})

const userBill = asyncHandler(async (User) => {
  const customer = await stripe.customers.create({
    email : User.email,
  })

  console.log(customer.id)


  const userBill = new userSubscriptions(
    { 
      user_id : User.id,
      billingId : customer.id,
      plan : 'trial',
      endDate: Math.floor((Date.now() + (14 * 24 * 60 * 60 * 1000)) / 1000),
      active : 'active',
    }
  )

  await userBill.save()
  
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

    const searchUser = await user.findOne({ email : email });
    

    //compare password with hashedpassword
    

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
    const User = await user.findById(req.user.id)
    if(!User){
      res.sendStatus(404)
    }

    const pattern = /googleusercontent\.com\//;

    //console.log(User.profilePicture, pattern.test(User.profilePicture))

    const profilePicture = !User.profilePicture.includes("googleusercontent.com")  ? (`http://${process.env.SERVER_DOMAIN}/upload/${(User.profilePicture !== 'null') ? (User.profilePicture).substring((User.profilePicture).indexOf('profilePicture')) : 'def.jpg'}`) : User.profilePicture
    res.status(200).json(
    {
      id : User.id,
      username : User.username,
      email : User.email,
      active : User.active,
      watchList : User.watchList,
      profilePicture : profilePicture,
      googleActive : User.googleActive,
      isPasswordChangeable : User.password ? true : false,
      topt_status : User.topt_status ? User.topt_status : false  
    }
    );
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
  const customer = (await userSubscriptions.findOne({ user_id : req.user.id }))
  if(customer.subscriptionId && customer.active !== 'cancelled'){
    console.log(customer)
    await stripe.subscriptions.del( (await userSubscriptions.findOne({ user_id : req.user.id })).subscriptionId )
  }
  await userSubscriptions.findOneAndDelete({ user_id : req.user.id })
  await User.deleteOne()
  res.status(200).json(req.user)

})

// Get user info to display on password reset UI
// Route GET api/email-active
// access public
const getUserInfoForActivation = asyncHandler(async (req, res) =>{
  const { key, id } = req.query
  const User = await user.findById(id)
  if(!User || User.password !== key){
    res.status(404).json({message: ('User not found')});
    throw new Error('User not found')
  }
  res.redirect(`https:///${process.env.DOMAIN}/activate`)
})



//Activate user
//Route PUT api/activate/:key/:id:
//Access Public
const updateActiveStatus = asyncHandler(async (req, res) =>{
  const User = await user.findById(req.query.id)
  if(!User || User.password !== req.query.key){
    res.status(404)
    throw new Error('User not found')
  }
  
  await User.updateOne({ active : true })

  res.status(200).json('User activated')
})

/// Desc resend activate info
/// Route POST api/activate
/// Access Private
const resendActiveStatus = asyncHandler( async(req, res) =>{
  const User = await user.findById(req.user.id)
  console.log(User.email)
  if(!User){
    res.status(404)
    throw new Error('User not found')
  }
  const emailMessage = {
    from: process.env.EMAIL,
    to: User.email,
    subject: 'Verify your email address',
    html: `<p>Please click <a href="http://${process.env.SERVER_DOMAIN}/activate?key=${User.password}&id=${User.id}">here</a> to verify your email address.</p>`
  };

  transporter.sendMail(emailMessage, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(201).json({ 'email' : User.email, 'id' : User.id})
  
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
///Route POST /api/profile-picture
///access private
const setProfilePicture = asyncHandler(async (req, res) => {
  
  const User = await user.findById(req.user.id)

  //console.log(User.profilePicture.includes("googleusercontent.com"))

  if(User.profilePicture === 'null' || User.profilePicture.includes("googleusercontent.com")){
    await User.updateOne({ profilePicture : req.file.path})
    console.log(User.profilePicture)
  }
  else{
    try{
      fs.unlink(User.profilePicture, (err) => {
        if (err) console.log(err.message);
        console.log('File deleted successfully');
      });  
    }
    catch(err){
      console.log(err.message)
    }
    //console.log(path.join(req.file.path))

    await User.updateOne({ profilePicture : req.file.path })  
  }
  res.status(200).json('success')
});

///desc DELETE profile Picture to the user
///Route DELETE /api/profile-picture
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


///
/// CHANGE PASSWORD SECTION  
///

// Send request to change password
// Route POST /api/change-password
// access public
const changePasswordRequest = asyncHandler(async (req, res) =>{
    const { email } = req.body

    console.log(email)

    const User = await user.findOne({ email : email })

    if(!User){
      return res.status(404).json({ message : 'User not found'})
    }

    const token = jwt.sign({ userId: User.id }, process.env.ACCESS_TOKEN_SECERT, {
      expiresIn: '1h'
    });

    await User.updateOne({$set: { PasswordResetToken : token }})
    const resetUrl = `/password-reset?token=${token}`;
    const emailMessage = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset password',
      html: `<p>Please click <a href="http://${process.env.SERVER_DOMAIN}/password-reset?token=${token}">here</a> to reset your password.</p>`
    };

    var resStatus = 200
    // Send the password reset email
    await transporter.sendMail(emailMessage, (error, info) => {
      if (error) {
        console.error(error)
        resStatus = 500
      } else {
        console.log('Password reset email sent: ' + info.response);
      }
    });
    res.status(resStatus).json(token)
})

// Desc change user password
// Router PUT /api/change-password
// access private
const changePassword = asyncHandler(async (req, res) =>{
  const { token, password } = req.query
  
  //console.log(token, password)

  if(!isValidPassword(password)){
    return res.status(400).json({ message: 'Invalid password'})
  }

  var decoded
  try{
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT) 
  }
  catch(err){
    return res.sendStatus(403)
  }
  
  const User = await user.findById(decoded.userId)
  if (!User || User.PasswordResetToken !== token || User.PasswordResetToken === 'null') {
    return res.status(404).json('User not found');
  }
  await User.updateOne({PasswordResetToken : 'null'})
  const hashPassword = await bcrypt.hash(password, 8)
  User.password = hashPassword
  await User.save()
  res.sendStatus(200)
})

///
/// CHANGE EMAIL
///


// Send request to change email
// Route POST /api/change-email
// access private
const changeEmailRequest = asyncHandler(async (req, res) =>{
  
  const { email } = req.body

  const User = await user.findById(req.user.id)
  

  if(!User){
    return res.sendStatus(404)
  }
  
  if(email === User.email){
    return res.status(404).json({
      message : 'Email is the same'
    })
  }

  if(!isEmail(email)){
    return res.status(400).json({ 
      message : 'Invalid email'
    })
  }

  if(await user.findOne( { email : email })){
    return res.status(400).json({ message : 'Email is taken'})
  }

  const code = Math.floor(Math.random() * 900000) + 100000;
  const token = jwt.sign({ 
    userId: User.id,
    code : code,
    email : email
  }, process.env.RESET_TOKEN, {
    expiresIn: '10m'
  });

  await User.updateOne({$set: { emailResetToken : token }})
  const emailMessage = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Reset email',
    html: `<p>Please enter this code <b>${code}</b> to reset your email.</p>`
  };

  // Send the password reset email
  await transporter.sendMail(emailMessage, (error, info) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    } else {
      console.log('Email reset email sent: ' + info.response);
    }
  });
  res.sendStatus(200)
})

// Desc change user email
// Router PUT /api/change-email
// access private
const changeEmail = asyncHandler(async (req, res) =>{
  const { code } = req.body

  console.log(req.body)


  const User = await user.findById(req.user.id)

  console.log(User)
  
  if (!User || User.emailResetToken === 'null') {
    return res.status(404).json({ message : 'User not found' })
  }
  var decoded
  try{
    decoded = jwt.verify(User.emailResetToken, process.env.RESET_TOKEN)
  }
  catch(err){
    return res.status(403).json({ message : err.message})
  }
  console.log(decoded.code, code, decoded.email)

  if(code != decoded.code){
    res.status(400)
    throw new Error('Code is wrong')
  }
  if(User.email === decoded.email){
    return res.status(405).json({ message : 'Provided email the same' })    
  }

  await User.updateOne({emailResetToken : 'null', email : decoded.email, active : true})

  res.sendStatus(200)
})

/// Desc Change password
/// Route PUT /api/change-password-authed
/// Access private
const changePasswordByToken = asyncHandler( async(req, res) => {
  const { currecntPassword, password } = req.body

  if(!isValidPassword(password)){
    return res.status(400).json({ message: 'Invalid password'})
  }

  const hashPassword = await bcrypt.hash(password, 8)

  const User = await user.findById(req.user.id)

  if(!User){
    return res.status(404).json({ message: 'User not found'})  
  }

  if(!(bcrypt.compareSync(currecntPassword, User.password))){
    return res.status(400).json({ message: 'Wrong current password'})
  }

  await User.updateOne({ password : hashPassword})
  res.sendStatus(200)
})



module.exports = {
    userBill,
    registerUser,
    getUserInfoForActivation,
    loginUser,
    getUser,
    deleteUser,
    setProfilePicture,
    deleteProfilePicture,
    updateActiveStatus,
    changePasswordRequest,
    changePassword,
    changeEmailRequest,
    changeEmail,
    resendActiveStatus,
    changePasswordByToken
  }
