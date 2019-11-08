const express = require('express');

const app = express();
const port = 3001;

//Middleware
const apiCall = async function () {
  const stuff = await get(
    `https://www.bungie.net/Platform/Destiny2/1/Profile/${req.params.slug}/?components=200`,
    {
      headers: {
        "X-API-KEY": API_KEY
      }
    }
  );
}


app.use('/test');

// Error handling, keep at bottom of middleware (so sayeth the docs)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
// Routes

app.get('/', (res, req, next) => {
  req.send('Hello World');
});



app.listen(port, () => console.log(`Listening on port ${port}`));