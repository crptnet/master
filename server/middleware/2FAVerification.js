const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const user = require('../models/userModel')

const validatetotpToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Totp || req.headers.totp;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    var verifyErr
    var decodedToken
    jwt.verify(token, process.env.TWOFA_TOKEN_SECERT, async (err, decoded) => {
      if (err) {
        res.status(401);
        verifyErr = new Error(err);
        return
      }
      decodedToken = decoded
      req.totp = decoded
    })
    
    if(verifyErr){
        res.send({ message : 'totp not verified'})
        throw verifyErr
    }
    
    if(decodedToken.user.user_id != req.user.id){
        res.status(401).send()
        throw new Error('User not authorized')

    }
    if(!(await user.findById(req.user.id))){
      res.status(404)
      throw new Error("User not found");  
    }
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }

    next();
  }
  else{
    res.status(401).send({ message : '2FA token not provied'});
    throw new Error("2FA token not provied");
  }
});

module.exports = validatetotpToken