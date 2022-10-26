const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

// body parsing middleware
const jsonParser = bodyParser.json();

// port & key
const PORT = process.env.PORT || 3001;
const apiKey = process.env.REACT_APP_WEATHER_API;

// cors
app.use(cors());

app.use(
  cors({
    origin: '*',
  })
);

// static middleware
app.use(express.static(__dirname + '../public'));

// routes
// coordinates sent from frontend on page load
app.post('/api', jsonParser, async (req, res) => {
  const lat = req.body.lat;
  const long = req.body.long;
  // api call
  try {
    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}&days=3&aqi=no&alerts=no`
    );
    res.json(data);
  } catch (err) {
    console.log('Error: Could not retrieve data. Please try again.');
  }
});

app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`===> LISTENING ON ${PORT} <===`);
});
