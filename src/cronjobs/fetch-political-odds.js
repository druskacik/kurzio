const CronJob = require('cron').CronJob;

const fetchOdds = require('./functions/fetch-odds');

const job = new CronJob({
  cronTime: '2 * * * *',
  onTick: async () => {
    console.log('Running cronjob: fetch political odds ...');
    try {
      await fetchOdds();
      console.log('Cron run successfully !');
    } catch (err) {
      console.log(err);
    }
  },
})

// job.start();
module.exports = job;