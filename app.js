const https = require('https');
const fs = require('fs');
const express = require('express');
const rp = require('request-promise-native');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;
const { API_KEY, Mongo_DB } = process.env;

// Connect to MongoDB
mongoose.connect(Mongo_DB, () => console.log('Connected to MongoDB'));

const serverListenTime = function () {
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return time;
}
// Middleware
const authRoutes = require('./routes/auth.js');
const apiRoutes = require('./routes/api.js');


// OAuth Handling
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Error handling, keep at bottom of middleware (so sayeth the docs)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(404).send("Sorry can't find that!");
});


// Routes



app.get('/', (req, res, next) => {
  // console.log(res);
  res.send('Home');
});



https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, app).listen(PORT, err => {
  console.log(`Listening on port ${PORT} at ${serverListenTime()}`);
  if (err) console.log('error', err);
});