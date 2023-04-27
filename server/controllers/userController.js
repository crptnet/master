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

    const newUser = new user({ username, email, password: hashPassword });
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
///desc Get current user
///Route GET /api/current
///access private
const getUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });


module.exports = {
    registerUser,
    loginUser,
    getUser
}