const asyncHandler = require('express-async-handler')
const user = require('../models/userModel') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
///desc Register a user
///Route POST /api/register
///access public
const registerUser = asyncHandler(async (req, res) => {
    console.log(req)
    const {username, email, password} = req.body
    if(!username || !email || !password || password.length > 72){
        console.log('test2')
        res.status(400).send('Invalid user info');
        throw new Error('Invalid user info')
    }
    if(await user.findOne({ email })){
        res.status(409).send('Username already taken');
        throw new Error('User already taken')
    }
    const hashPassword = await bcrypt.hash(password, 8)

    const newUser = new user({ username, email, password: hashPassword, profilePicture: 'null' });
    await newUser.save();

    if(newUser){
        return res.status(201).json({ 'email' : email, 'id' : newUser.id})
    }
    return res.status(200).send()
})
///desc Login a user
///Route POST /api/login
///access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const searchUser = await user.findOne({ email });
    //compare password with hashedpassword
    if (searchUser && (await bcrypt.compare(password, searchUser.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: searchUser.username,
            email: searchUser.email,
            id: searchUser.id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "15d" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
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
  const result = await user.findByIdAndRemove(req.user.id)
  console.log(result)
  if(!result){
    res.status(404)
    throw new Error('User not found')
  }
  res.status(200).json(req.user)
})


  
///desc Set profile Picture to the user
///Route POST /api/profilePicture
///access private
const setProfilePicture = asyncHandler(async (req, res) =>{
  console.log(req.file)
  await user.findByIdAndUpdate(req.user.id, { profilePicture : file.path})
  res.status(200).json('success')
});

///desc DELETE profile Picture to the user
///Route DELETE /api/profilePicture
///access private
const deleteProfilePicture = asyncHandler(async (req, res) =>{

});

///desc GET profile Picture to the user
///Route GET /api/profilePicture
///access public
const getProfilePicture = asyncHandler(async (req, res) =>{
  const User = await user.findById(req.user.id)
  console.log(User)
  res.status(200).json({})
});





module.exports = {
    registerUser,
    loginUser,
    getUser,
    getProfilePicture,
    deleteUser,
    setProfilePicture
}