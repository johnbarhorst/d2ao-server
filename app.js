const express = require('express');
const request = require('request');
const rp = require('request-promise-native');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;

//Middleware
app.use(function (req, res, next) {
  res.header("Origin", "https://www.bungie.net");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Origin", `http://localhost:${port}`);
  next();
});

app.use(cors());

//Handle Character Search Request 
app.use('/api/search/:search', async (req, res, next) => {
  console.log('Search Character');
  console.log(req.params);
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${req.params.search}/`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(JSON.parse(body));
  });
  res.send(data);

});


// Handle Character List Request
// app.use('/api/:platformId/:accountId', (req, res, next) => {
//   console.log('Got there');
//   console.log(req.params);
//   request({
//     url: `https://www.bungie.net/Platform/Destiny2/${req.params.platformId}/Profile/${req.params.accountId}/?components=200`,
//     headers: {
//       "X-API-KEY": API_KEY
//     }
//   }).pipe(res);
// });

// Error handling, keep at bottom of middleware (so sayeth the docs)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(404).send("Sorry can't find that!");
})
// Routes

app.get('/api/search/:search', (req, res, next) => {
  // console.log(res);
  res.send();
});



app.listen(port, () => console.log(`Listening on port ${port} at ${Date.now()}`));