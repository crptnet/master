const GoogleSecret = require('../client_secret_22208776050-nv7hj7qppl8h39vpl9gkq31utgj43op8.apps.googleusercontent.com.json')
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

function validateGoogleToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1]; // assuming token is passed in the Authorization header

  async function verify() {
    var payload

    payload = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)

    
    req.user = {
      email: payload.data.email,
      name: payload.data.name,
      picture: payload.data.picture
    };
    next();
  }
  verify().catch(err => {
    res.status(401).json({ error: err.message });
  });
}

module.exports = validateGoogleToken;