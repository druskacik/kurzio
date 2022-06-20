const CronJob = require('cron').CronJob;

const fetchNewCompetitions = require('../scrapers/1/fetch-matches');

let jobIsRunning = false;

const job = new CronJob({
    cronTime: '6/10 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: [FETCH-MATCHES] ...');
            try {
                await fetchNewCompetitions();
                console.log('Cron [FETCH-MATCHES] run successfully !');
            } catch (err) {
                console.log(err);
            } finally {
                jobIsRunning = false;
            }
        } else {
            console.log('Job [FETCH-MATCHES] still running, aborting.');
        }
    },
})

job.start();