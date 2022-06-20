const CronJob = require('cron').CronJob;

const fetchNewSports = require('../scrapers/1/fetch-sports-and-competitions');

let jobIsRunning = false;

const job = new CronJob({
    cronTime: '2 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: [FETCH-SPORTS-AND-COMPETITIONS] ...');
            try {
                await fetchNewSports();
                console.log('Cron [FETCH-SPORTS-AND-COMPETITIONS] run successfully !');
            } catch (err) {
                console.log(err);
            } finally {
                jobIsRunning = false;
            }
        } else {
            console.log('Job [FETCH-SPORTS-AND-COMPETITIONS] still running, aborting.');
        }
    },
})

job.start();