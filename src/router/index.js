const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

const app = express();

app.use(cors());

const knex = require('../../knex_connection');

const sportsAndCompetitions = require('./routes/sport-and-competitions');
const subscription = require('./routes/subscription');

// enforce HTTPS
const requireHTTPS = (req, res, next) => {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);

// starts all cronjobs
require('../cronjobs');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../pages')));

// serve vue build
app.use(express.static('./dist'));

app.use('/api/get-sports', sportsAndCompetitions);
app.use('/api/subscription', subscription);

const listen = (port) => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  })
}

module.exports = listen;