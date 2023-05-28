const expressAsyncHandler = require("express-async-handler");
const APIKeys = require("../models/apiKeyModel");
const axios = require('axios');
const crypto = require('crypto');
const markets = ['Binance'];

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

    console.log('Updated API keys:', updatedKeys);
  } catch (error) {
    console.error('Error pushing new keys:', error);
    return error;
  }
};

async function getBinanceAccount(apiKey, apiSecret) {
  // Binance API endpoint for account information
  const endpoint = 'https://api.binance.com/api/v3/account';

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
    method: 'GET',
    headers,
  }).then((response) => response).catch((error) => {
    error.status = error.response.status;
    return error;
  });

  return res;
}

const getUserKeys = async (req, res) => {
  const keys = (await APIKeys.findOne({ user_id: req.user.id })).keys.map((key) => ({
    publicKey: decrypt(key.publicKey, key.publicIv),
    id: key.id,
    market: key.marketId
  })).sort((a, b) => (a.updatedAt - b.updatedAt));

  return res.json({ data: keys });
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

module.exports = {
  createAPIKeyPair,
  getUserKeys,
};