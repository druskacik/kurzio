const moment = require('moment');

const knex = require('../../knex_connection');
const config = require('../config');

const updateTimestamps = async () => {
  try {
    const timestamps = await knex('fetch_timestamp').select();
    for (let timestamp of timestamps) {
      await knex('fetch_timestamp')
        .where('id', '=', timestamp.id)
        .update({
          created_at: moment(timestamp.created_at).add(2, 'hours').format(config.datetimeFormat),
        })
    }
    console.log('Timestamps updated successfully !');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

console.log('Running migration ...');

updateTimestamps();