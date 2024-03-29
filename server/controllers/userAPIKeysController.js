const expressAsyncHandler = require("express-async-handler");
const APIKeys = require("../models/apiKeyModel");
const axios = require('axios');
const crypto = require('crypto');
const binanceApi = require('node-binance-api')
const User = require('../models/userModel')
const markets = ['Binance'];
const UserAssets= require('../models/userAssets')
const util = require('util');


const createAPIKeyPair = expressAsyncHandler(async(req, res) => {
  const { publicKey, privateKey, market } = req.body;
  const marketId = markets.indexOf(market);
  if (!marketId && market !== 'Binance') {
    return res.status(400).json({ message: 'Invalid market' });
  }
  
  const userId = req.user.id;
  let apiKey = await APIKeys.findOne({ user_id: userId });
  const account = await getBinanceAccount(publicKey, privateKey);
  if (!account || account.status !== 200) {
    return res.status(400).json({ message: account.response.data.msg, code: account.response.data.code });
  }
  if (!apiKey) {
    const encryptedPublicKey = encrypt(publicKey);
    const encryptedPrivateKey = encrypt(privateKey);

    apiKey = new APIKeys({
      user_id: req.user.id,
      keys: {
        publicKey: encryptedPublicKey.encrypted,
        privateKey: encryptedPrivateKey.encrypted,
        marketId: marketId,
        publicIv: encryptedPublicKey.iv,
        privateIv: encryptedPrivateKey.iv
      }
    });  
    await apiKey.save();
    return res.sendStatus(200);
  }

  try {
    const duplicateKeyPair = await checkDuplicateKeyPair(apiKey.keys, publicKey, privateKey);
    if (duplicateKeyPair) {
      return res.status(400).json({ message: 'Given key pair has already been added' });
    }
    pushNewKeys(req.user.id, publicKey, privateKey, marketId);
  } catch {
    return res.sendStatus(500);
  }

  return res.sendStatus(200);

});

const pushNewKeys = async (userId, publicKey, privateKey, marketId) => {
  try {
    const encryptedPublicKey = encrypt(publicKey);
    const encryptedPrivateKey = encrypt(privateKey);
    const updatedKeys = await APIKeys.findOneAndUpdate(
      { user_id: userId }, // Filter the document by user_id
      { $push: { keys: {
        publicKey: encryptedPublicKey.encrypted,
        privateKey: encryptedPrivateKey.encrypted,
        marketId: marketId,
        publicIv: encryptedPublicKey.iv,
        privateIv: encryptedPrivateKey.iv
      } } }, // Push new keys to the keys array
      { new: true } // Return the updated document
    );
  } catch (error) {
    console.error('Error pushing new keys:', error);
    return error;
  }
};

async function getBinanceAccount(apiKey, apiSecret) {
  const endpoint = 'https://api.binance.com/api/v3/account';
  const timestamp = Date.now();
  const queryString = `timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');
  const url = `${endpoint}?${queryString}&signature=${signature}`;
  const headers = {
    'X-MBX-APIKEY': apiKey
  };
  
  var res = await axios(url, { 
    method: 'GET',
    headers,
  }).then((response) => { return response}).catch((error) => {
    error.status = error.response.status;
    return error;
  });

  return res;
}

const getUserKeys = async (req, res) => {
  const keyPairs = await APIKeys.findOne({ user_id: req.user.id })
  if(!keyPairs){
    return res.status(200).json({ message : 'User do not have any key pairs'})
  }
  const keys = keyPairs.keys.map((key) => ({
    publicKey: decrypt(key.publicKey, key.publicIv),
    id: key.id,
    market: key.marketId
  })).sort((a, b) => (a.updatedAt - b.updatedAt));

  return res.json({ data: keys });
}

const getWallet = async (req, res) => {
  const { keyPairId } = req.body 
  var keyPair = await APIKeys.findOne({ user_id: req.user.id })
  if(!keyPair){
    return res.status(404).send()
  }
  
  if(keyPair.user_id != req.user.id){
    return res.status(403).send()
  }
  keyPair = keyPair.keys.find((keyPair) => keyPair._id == keyPairId)
  if(!keyPair){
    return res.status(404).send()
  }
  const publicKey = decrypt(keyPair.publicKey, keyPair.publicIv)
  const privateKey = decrypt(keyPair.privateKey, keyPair.privateIv)
  const binanceAcount = new binanceApi().options({
    APIKEY: publicKey,
    APISECRET: privateKey,
    'family': 4,
  });
  console.log({ user_id : req.user_id, publicKey, privateKey})
  await binanceAcount.useServerTime();
  binanceAcount.balance((error, balances) => {
      if ( error ){
        res.status(500).send(error)
        return console.error(error);
      } 
      res.status(200).send({ data : Object.entries(balances)
        .filter(([key, value]) => parseFloat(value.available) + parseFloat(value.onOrder) > 0)
        .map(([key, value]) => ({ asset: key, ...value }))})
  });

}

const checkDuplicateKeyPair = async (keys, publicKey, privateKey) => {
  const duplicate = keys.find(key => {
    const decryptedPublicKey = decrypt(key.publicKey, key.publicIv);
    const decryptedPrivateKey = decrypt(key.privateKey, key.privateIv);
    return decryptedPublicKey === publicKey && decryptedPrivateKey === privateKey;
  });
  return duplicate;
};

function generateRandomIV() {
  return crypto.randomBytes(16);
}

function encrypt(text) {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.APIKEY_SECRET, 'hex');
  const iv = generateRandomIV();

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encrypted,
    iv: iv.toString('hex')
  };
}

function decrypt(encryptedText, iv) {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.APIKEY_SECRET, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

const deleteKeyPair = async (req, res) => {
  const { keyId } = req.body
  const userKeyPairs = await APIKeys.findOne({ user_id : req.user.id })
  if(!userKeyPairs){
    return res.status(404).send({ message : 'User not found', ok : false, status : 'failed'   })
  }
  if(!(userKeyPairs.keys).find((key) => key.id == keyId)){
    return res.status(403).send({ message : 'Key not found', ok : false, status : 'failed'   })
  }
  var updatedKeys
  try{
    updatedKeys = await userKeyPairs.updateOne(
      { $pull: { keys: {_id : keyId }  } },
      { new: true }
    );
  }
  catch(err){
    res.status(400).send({ message : err, ok : false, status : 'failed' })
  }
  await UserAssets.deleteOne({ keyPair_id : keyId })
  res.status(200).send({ status : 'success', ok : true, message : 'success'})
  
  // return res.status(200).send((userKeyPairs.keys).map((key) => ({
  //   publicKey: decrypt(key.publicKey, key.publicIv),
  //   id: key.id,
  //   market: key.marketId
  // })).sort((a, b) => (a.updatedAt - b.updatedAt)))
}

const screenUserWallet = async (keys) => {
  console.log(keys)
  for (const keyPair of keys) {
    const binanceAccount = new binanceApi().options({
      APIKEY: decrypt(keyPair.publicKey, keyPair.publicIv),
      APISECRET: decrypt(keyPair.privateKey, keyPair.privateIv),
      'family': 4,
    });

    const balancePromise = util.promisify(binanceAccount.balance.bind(binanceAccount));
    const balances = await balancePromise();

    const data = Object.entries(balances)
        .filter(([key, value]) => parseFloat(value.available) + parseFloat(value.onOrder) > 0)
        .map(([key, value]) => ({
          asset: key,
          available: String(value.available),
          onOrder: String(value.onOrder)
        }));

    const assets = await UserAssets.findOne({ keyPair_id: keyPair._id });

    if (!assets) {
      const newAsset = new UserAssets({ user_id: user._id, keyPair_id: keyPair._id, assets: [{ date: data }] });
      await newAsset.save();
      continue;
    }
    
    try {
      await assets.updateOne({ $push: { assets: [{ date: data }] } }, { new : true } );
    } 
    catch (err) {
      console.log(err);
    }
  }
  
}

const screenUserWallets = async () => {
  const userIds = await User.find({}, '_id');
  for (const user of userIds) {
    const keys = (await APIKeys.findOne({ user_id: user._id }))?.keys;
    if(keys){
      await screenUserWallet(keys)
    }
  }
  
};
const getWalletHistory = expressAsyncHandler(async (req, res) => {
  const { keyPairId } = req.body;
  const assets = await UserAssets.findOne({ keyPair_id: keyPairId });
  if (!assets) {
    return res.status(400).send({ message: 'Assets not found', ok : false, status : 'failed' });
  }

  if (assets.user_id !== req.user.id) {
    return res.status(403).send({ message: 'Wrong user found', ok : false, status : 'failed' });
  }
  

  res.status(200).send({  ok : true, status : 'success', data: assets, spend : 'undefined' });
});

function resetAtMidnight() {
  var now = new Date();
  var night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
  );
  var msToMidnight = night.getTime() - now.getTime();

  setTimeout(function() {
      screenUserWallets();
      resetAtMidnight(); 
  }, msToMidnight);
}

screenUserWallets()

module.exports = {
  getWalletHistory,
  resetAtMidnight,
  createAPIKeyPair,
  getUserKeys,
  getWallet,
  deleteKeyPair,
};
