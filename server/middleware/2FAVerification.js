const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const user = require('../models/userModel')

const validateToptToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Topt || req.headers.topt;
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
    })
    
    if(verifyErr){
        res.send({ message : 'topt not verified'})
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
    res.status(401).send({ message : 'Token not provided'});
    throw new Error("Token not provied");
  }
});

module.exports = validateToptToken