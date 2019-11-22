const router = require('express').Router();

//auth login

router.get('/login', (req, res) => {
  // Handle login with passport
  res.send('Bungie Login stuff to come');
});

router.get('/logout', (req, res) => {
  // Handle logout with passport
  res.send('Bungie Logout stuff to come');
});

router.get('/redirect', (req, res) => {
  res.send('Redirect');
});

module.exports = router;