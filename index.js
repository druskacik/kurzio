const express = require('express');

const app = express();

const knex = require('./knex_connection');

const port = process.env.PORT || 1000;

// starts all cronjobs
// require('./src/cronjobs');

app.get('/', (req, res) => {
  res.end('SERVER RUNNING, to see data visit /odds');
})

app.get('/courses', (req, res) => {
  res.status(200)
    .end('DEPRECATED, please visit /odds');
})

app.get('/events', async (req, res) => {
  try {
    const events = await knex('event').select();
    res.status(200)
      .json(events);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .json(err);
  }
})

app.get('/timestamps', async (req, res) => {
  try {
    const timestamps = await knex('fetch_timestamp').select();
    res.status(200)
      .json(timestamps);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .json(err);
  }
})

app.get('/odds', async (req, res) => {
  try {
    const odds = await knex('odd').select();
    res.status(200)
      .json(odds);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .json(err);
  }
})

const listen = (port) => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  })
}

listen(port);