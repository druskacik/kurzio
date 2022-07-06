const CronJob = require('cron').CronJob;

const knex = require('../../knex_connection');

const job = new CronJob({
    cronTime: '0 * * * *', // at minute 0
    onTick: async () => {
        console.log('Running cronjob: [TOGGLE-ADMIN-NOTIFICATION-STATUS] ...');
        try {

            await knex('admin_notification')
                .where({
                    type: 'REQUEST_ERROR',
                })
                .update({
                    locked: false,
                });
            
            console.log('Cron [TOGGLE-ADMIN-NOTIFICATION-STATUS] run successfully !');
        } catch (err) {
            console.log(err);
        }
    },
})

job.start();