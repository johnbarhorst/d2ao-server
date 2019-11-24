const router = require('express').Router();
const passport = require('passport');
const Oauth2Strategy = require('passport-oauth2');
require('dotenv').config();
const { client_id, client_secret } = process.env;

//auth login

passport.use(new Oauth2Strategy({
  authorizationURL: 'https://www.bungie.net/en/oauth/authorize',
  tokenURL: 'https://www.bungie.net/platform/app/oauth/token/',
  clientID: client_id,
  clientSecret: client_secret,
  callBackURL: 'https://localhost3001:auth/redirect'
}, (accessToken, refreshToken, profile, cb) => {
  User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}));

router.get('/login', passport.authenticate('oauth2'));

router.get('/logout', (req, res) => {
  // Handle logout with passport
  res.send('Bungie Logout stuff to come');
});

router.get('/success', (req, res) => {
  //Test success page
  res.send('success');
});

router.get('/redirect', passport.authenticate('oauth2', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/success');
  });



module.exports = router;