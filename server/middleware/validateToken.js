const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const user = require('../models/userModel')

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, async (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error(err);
      }
      
      req.user = decoded.user;
    });
    if(!(await user.findById(req.user.id))){
      res.status(404)
      throw new Error("User not found");  
    }
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
    if(req.method == 'POST')
      console.log('Token validated')
    next();
  }
  else{
    res.status(401);
    throw new Error("User is not authorized");
  }
});

module.exports = validateToken;