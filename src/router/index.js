const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const telegramBotWebhook = require('./telegram-webhook');

const app = express();

app.use(cors());

// starts all cronjobs
if (!(process.env.MAINTENANCE_MODE == 1)) {
    require('../cronjobs');
} else {
    console.log('Maintenance mode on, cronjobs are not being run !');
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).end('ok');
});

app.use(`/api/telegram${process.env.TELEGRAM_BOT_TOKEN}`, telegramBotWebhook);

const listen = (port) => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  })
}

module.exports = listen;