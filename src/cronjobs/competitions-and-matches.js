const CronJob = require('cron').CronJob;

const fetchNewCompetitions = require('../scrapers/1/fetch-new-competitions');

const job = new CronJob({
  cronTime: '*/5 * * * *',
  onTick: async () => {
    console.log('Running cronjob: fetch new competitions and matches ...');
    try {
      await fetchNewCompetitions();
      console.log('Cron run successfully !');
    } catch (err) {
      console.log(err);
    }
  },
})

module.exports = job;