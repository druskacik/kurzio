const CronJob = require('cron').CronJob;

const fetchOddTypes = require('../scrapers/1/fetch-odd-types');

let jobIsRunning = false;

const job = new CronJob({
    cronTime: '37 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: [FETCH-ODD-TYPES] ...');
            try {
                await fetchOddTypes();
                console.log('Cron [FETCH-ODD-TYPES] run successfully !');
            } catch (err) {
                console.log(err);
            } finally {
                jobIsRunning = false;
            }
        } else {
            console.log('Job [FETCH-ODD-TYPES] still running, aborting.');
        }
    },
})

job.start();