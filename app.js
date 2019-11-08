const express = require('express');
const request = require('request');
require('dotenv').config();

const app = express();
const port = 3001;

//Middleware
const API_KEY = process.env.API_KEY;



app.use('/test', function (req, res, next) {
  console.log('Got there');
  request({
    url: `https://www.bungie.net/Platform/Destiny2/1/Profile/4611686018434143187/?components=200`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }).pipe(res);
});

// Error handling, keep at bottom of middleware (so sayeth the docs)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(404).send("Sorry can't find that!");
})
// Routes

app.get('/test', (req, res, next) => {

  res.send(res);
});



app.listen(port, () => console.log(`Listening on port ${port} at ${Date.now()}`));