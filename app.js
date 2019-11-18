const express = require('express');
const rp = require('request-promise-native');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;


// Middleware

// Enable Cross Origin Access
app.use(cors());


// Error handling, keep at bottom of middleware (so sayeth the docs)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(404).send("Sorry can't find that!");
});


// Routes

// Handle Item Instance Requests 
app.get('/api/Item/:membershipType/:destinyMembershipId/:itemInstanceId', async (req, res, next) => {
  console.log('Item Request');
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/${req.params.membershipType}/Profile/${req.params.destinyMembershipId}/Item/${req.params.itemInstanceId}/?components=300`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  console.log(JSON.parse(data).Response);
  res.send(data);
});

// Handle Character List Request
app.get('/api/Profile/:membershipType/:destinyMembershipId', async (req, res, next) => {
  console.log('Character List Request');
  console.log(req.params);
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/${req.params.membershipType}/Profile/${req.params.destinyMembershipId}/?components=200,100`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  console.log(JSON.parse(data).Response);
  res.send(data);
});

//Handle Individual Character Request

app.get('/api/Profile/:membershipType/:destinyMembershipId/:characterId', async (req, res, next) => {
  console.log('Character Request');
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/${req.params.membershipType}/Profile/${req.params.destinyMembershipId}/Character/${req.params.characterId}/?components=201`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  console.log(JSON.parse(data).Response);
  res.send(data);
});

//Handle Character Search Request
app.get('/api/search/:search', async (req, res, next) => {
  console.log('Search Character');
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${req.params.search}/`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  res.send(data);
});

app.get('/', (req, res, next) => {
  // console.log(res);
  res.send();
});



app.listen(port, () => console.log(`Listening on port ${port} at ${Date.now()}`));