const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const user = require('../models/userModel')

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  console.log(authHeader)
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log(token)
    var verifyErr
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, async (err, decoded) => {
      if (err) {
        res.status(401);
        verifyErr = new Error(err);
        return
      }
      
      req.user = decoded.user;
      console.log(req.user)
    })
    if(verifyErr){
      throw verifyErr
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
    res.status(401);
    console.log('rerasdasd')
    throw new Error("Token is missing");
  }
});

module.exports = validateToken;