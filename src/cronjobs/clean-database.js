const CronJob = require('cron').CronJob;
const moment = require('moment');

const config = require('../config');

const knex = require('../../knex_connection');

const job = new CronJob({
  cronTime: '42 2 * * *',
  onTick: async () => {
    console.log('Running cronjob: cleaning database ...');
    try {
      const endTime = moment().subtract(25, 'hours').format(config.datetimeFormat);
      await knex('error')
        .where('created_at', '<', endTime)
        .del();
      await knex('subscription_request')
        .where('created_at', '<', endTime)
        .del();
      console.log('Cron run successfully !');
    } catch (err) {
      console.log(err);
    }
  },
})

module.exports = job;