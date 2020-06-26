const CronJob = require('cron').CronJob;

const functions = require('./functions');

const job = new CronJob({
  cronTime: '* * * * *',
  onTick: async () => {
    try {
      await functions.fetchOdds();
      console.log('Cron run successfully !');
    } catch (err) {
      console.log(err);
    }
  },
})

job.start();