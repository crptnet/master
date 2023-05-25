const expressAsyncHandler = require("express-async-handler")
const APIKeys = require("../models/apiKeyModel")
const axios = require('axios');
const crypto = require('crypto')
const markets = ['Binance']
///Desc Create API key pair for 
const createAPIKeyPair = expressAsyncHandler(async(req, res) => {
    const { publicKey, privateKey, market } = req.body
    const marketId = markets.indexOf(market)
    console.log(marketId)
    if(!marketId && market != 'Binance'){
        return res.status(400).json({ message : 'Invalid market' })
    }
    const userId = req.user.id
    if(await checkDuplicateKeyPair(publicKey, privateKey, userId)){
        return res.status(400).json({ message : 'Given key pair has been already added'})
    }
    let apiKey = await APIKeys.findOne({ user_id : userId }) 
    const account = await getBinanceAccount(publicKey, privateKey)
    console.log(account)
    if(!account || account.status !== 200){
        return res.status(400).json({ message : account.response.data.msg, code : account.response.data.code  })
    }
    if(!apiKey){

        apiKey = new APIKeys({user_id : req.user.id, keys : { publicKey : publicKey, privateKey : privateKey, marketId : marketId }})  
        const savedKeys = await apiKey.save()

        return res.sendStatus(200);
    }

    try{
        pushNewKeys(req.user.id, publicKey, privateKey, marketId) 
    }
    catch{
        return res.sendStatus(500);
    }
    return res.sendStatus(200);

})

async function checkDuplicateKeyPair(publicKey, privateKey, userId) {
    const apiKeys = await APIKeys.findOne({ user_id: userId });
    if (apiKeys) {
      const duplicateKeyPair = apiKeys.keys.find(
        keyPair =>
          keyPair.publicKey === publicKey && keyPair.privateKey === privateKey
      );
  
      if (duplicateKeyPair) {
        return true;
      }
    }
    
    return false;
  }

const pushNewKeys = async (userId, publicKey, privateKey, markerId) => {
    try {
      const updatedKeys = await APIKeys.findOneAndUpdate(
        { user_id: userId }, // Filter the document by user_id
        { $push: { keys: { publicKey, privateKey, markerId } } }, // Push new keys to the keys array
        { new: true } // Return the updated document
      );
  
      console.log('Updated API keys:', updatedKeys);
    } catch (error) {
      console.error('Error pushing new keys:', error);
        return error
    }
  };

async function getBinanceAccount(apiKey, apiSecret){
    // Binance API endpoint for account information
    const endpoint = 'https://api.binance.com/api/v3/account';

    // API credentials
    // const apiKey = 'ozwgFLGOSc39qYGmHGlPsEyXuuODEeotje1uQotYZPQRKyB5DccvINR2Kx4ufsgF';
    // const apiSecret = 'TlHXwMTzdnB9cvstYTyvogS0XXmYdHiwC92km2e50CqEA5iitnLBFOPj328R2PkI';

    const timestamp = Date.now();
    const queryString = `timestamp=${timestamp}`;

    // Generate the signature using HMAC-SHA256
    const signature = crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');

    const url = `${endpoint}?${queryString}&signature=${signature}`;

    // Set up the request headers with the API key
    const headers = {
    'X-MBX-APIKEY': apiKey
    };  
    var res = axios(url, { 
        method : 'GET',
        headers,
    }).then((response) => response).catch((error) => {
        error.status = error.response.status
        return error
    })


    //console.log(res)
    return res
}

function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', process.env.APIKEY_SECTER);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

module.exports = {
    createAPIKeyPair
}