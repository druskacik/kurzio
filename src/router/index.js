const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

const app = express();

app.use(cors());

const knex = require('../../knex_connection');

const sportsAndCompetitions = require('./routes/sport-and-competitions');
const subscription = require('./routes/subscription');

// starts all cronjobs
// require('./src/cronjobs');

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