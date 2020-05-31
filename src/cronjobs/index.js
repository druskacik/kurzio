const CronJob = require('cron').CronJob;

const saveOdds = require('./functions');

const job = new CronJob({
  cronTime: '0 * * * *',
  onTick: saveOdds,
})

job.start();