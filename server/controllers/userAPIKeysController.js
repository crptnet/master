const expressAsyncHandler = require("express-async-handler")
const APIKeys = require("../models/apiKeyModel")


///Desc Create API key pair for 
const createAPIKeyPair = expressAsyncHandler(async(req, res) => {
    const { publicKey, privateKey, market } = req.body
    const userId = req.user.id
    const apiKeys = await APIKeys.findOne({ user_id : userId }) 
    if(!apiKeys){
        
    }



})