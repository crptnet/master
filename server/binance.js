const axios = require('axios');
const crypto = require('crypto')

// Binance API endpoint for account information
const endpoint = 'https://api.binance.com/api/v3/account';

// API credentials
const apiKey = 'ozwgFLGOSc39qYGmHGlPsEyXuuODEeotje1uQotYZPQRKyB5DccvINR2Kx4ufsgF';
const apiSecret = 'TlHXwMTzdnB9cvstYTyvogS0XXmYdHiwC92km2e50CqEA5iitnLBFOPj328R2PkI';

// Generate a timestamp for the request
const timestamp = Date.now();

// Create the query string
const queryString = `timestamp=${timestamp}`;

// Generate the signature using HMAC-SHA256
const signature = crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');

// Construct the request URL
const url = `${endpoint}?${queryString}&signature=${signature}`;

// Set up the request headers with the API key
const headers = {
  'X-MBX-APIKEY': apiKey
};

// Make the API call
axios.get(url, { headers })
  .then(response => {
    // Handle the response data
    const coins = response.data.balances

    console.log(coins.filter((coin) => coin.free > 0));
  })
  .catch(error => {
    // Handle the error
    console.error(error);
  });
