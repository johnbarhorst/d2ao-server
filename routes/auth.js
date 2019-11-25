const router = require('express').Router();
const passport = require('passport');
const Oauth2Strategy = require('passport-oauth2');
const rp = require('request-promise-native');
require('dotenv').config();
const { client_id, client_secret, API_KEY } = process.env;
const User = require('../models/user-models.js');




//auth login

passport.use(new Oauth2Strategy({
  authorizationURL: 'https://www.bungie.net/en/oauth/authorize',
  tokenURL: 'https://www.bungie.net/platform/app/oauth/token/',
  clientID: client_id,
  clientSecret: client_secret,
  callBackURL: 'https://localhost:3001/auth/redirect'
}, async (accessToken, refreshToken, profile, cb) => {
  console.log('callback section reached');
  const data = await rp({
    url: `https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/`,
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  console.log(data);
}));

router.get('/login', passport.authenticate('oauth2'));

router.get('/logout', (req, res) => {
  // Handle logout with passport
  res.send('Bungie Logout stuff to come');
});

router.get('/failure', (req, res) => {
  res.send('Failure');
});

router.get('/success', (req, res) => {
  res.send('Success');
});

router.get('/redirect', passport.authenticate('oauth2', {}),
  (req, res) => {
    console.log('redirect');
    // Successful authentication, redirect home.
    res.redirect('/');
  });



module.exports = router;