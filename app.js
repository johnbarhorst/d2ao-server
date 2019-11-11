const fs = require('fs');
const express = require('express');
const request = require('request');
const rp = require('request-promise-native');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;


// Server stuff
// const getDatabasePaths = async function () {
//   const response = await rp({
//     url: `https://www.bungie.net/Platform/Destiny2/Manifest/`,
//     headers: {
//       "X-API-KEY": API_KEY
//     }
//   });
//   const json = await JSON.parse(response);
//   const data = await json.Response;
//   const path = await data;
//   console.log(data);
// }
// getDatabasePaths();


// const generateDB = async function () {
//   const data = await getDatabase();
//   fs.writeFile('db.json', data, (err) => {
//     if (err) throw err;
//   });
// }

// const getDatabase = async function () {
//   const path = await getDatabasePath();
//   request.get(`https://www.bungie.net${path}`).pipe(
//     fs.createWriteStream('db.json')
//   );
// }

// fs.access('db.json', fs.constants.F_OK, async (err) =>
//   err ? getDatabase() : console.log('db exists'));

// Middleware

// Enable Cross Origin Access
app.use(cors());


// Error handling, keep at bottom of middleware (so sayeth the docs)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(404).send("Sorry can't find that!");
});


// Routes

// Handle Character List Request
app.get('/api/Profile/:membershipType/:destinyMembershipId', async (req, res, next) => {
  console.log('Got there');
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

//Handle Character Search Request
app.get('/api/search/:search', async (req, res, next) => {
  console.log('Search Character');
  console.log(req.params);
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