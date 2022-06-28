const CronJob = require('cron').CronJob;

const fetchOdds = require('../scrapers/1/fetch-odds');

let jobIsRunning = false;

const job = new CronJob({
    cronTime: '8/10 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: [FETCH-ODDS] ...');
            try {
                await fetchOdds();
                console.log('Cron [FETCH-ODDS] run successfully !');
            } catch (err) {
                console.log(err);
            } finally {
                jobIsRunning = false;
            }
        } else {
            console.log('Job [FETCH-ODDS] still running, aborting.');
        }
    },
})

job.start();