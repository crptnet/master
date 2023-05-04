// const GoogleSecret = require('../client_secret_22208776050-nv7hj7qppl8h39vpl9gkq31utgj43op8.apps.googleusercontent.com.json')
// const { OAuth2Client } = require('google-auth-library');

// function validateGoogleToken(req, res, next) {
//   const token = req.headers.authorization.split(' ')[1]; // assuming token is passed in the Authorization header
//   const clientId = GoogleSecret.client_id; // replace with your Google OAuth client ID
//   const client = new OAuth2Client(clientId);

//   async function verify() {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: clientId,  
//     });
//     const payload = ticket.getPayload();
//     // validate that the token is for the correct Google client ID, and that it has not expired
//     if (payload.aud !== clientId || Date.now() > payload.exp * 1000) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }
//     // add the user information to the request object for use in downstream middleware or handlers
//     req.user = {
//       email: payload.email,
//       name: payload.name,
//       picture: payload.picture,
//       email_verified : payload.email_verified
//     };
//     next();
//   }
//   verify().catch(error => {
//     res.status(401).json({ error: 'Invalid token' });
//   });
// }

// module.exports = validateGoogleToken;