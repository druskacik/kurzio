const CronJob = require('cron').CronJob;

const fetchNewCompetitions = require('../scrapers/1/fetch-new-competitions');

const job = new CronJob({
  cronTime: '2 * * * *',
  onTick: async () => {
    console.log('Running cronjob: fetch competitions, matches, and odds ...');
    try {
      const alsoFetchOdds = true;
      await fetchNewCompetitions(alsoFetchOdds);
      console.log('Cron run successfully !');
    } catch (err) {
      console.log(err);
    }
  },
})

module.exports = job;