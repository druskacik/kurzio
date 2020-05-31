const moment = require('moment');

const config = require('../config');

const getOdds = require('./calls');

const Event = require('../models/Event');
const Timestamp = require('../models/Timestamp');
const Odd = require('../models/Odd');

// TODO: refactor
const fetchOdds = async () => {
  try {
    let events = await Event.fetchAll();
    events = events.toJSON();
    for (let event of events) {
      const odds = await getOdds(event.url);
      let timestamp = await Timestamp.forge({
        event_id: event.id,
        created_at: moment().add(2, 'hours').format(config.datetimeFormat),
      })
        .save();
      timestamp = timestamp.toJSON();
      const timestampID = timestamp.id;
      for (let odd of odds) {
        await Odd.forge({
          fetch_timestamp_id: timestampID,
          name: odd.name,
          value: odd.odd,
        })
          .save();
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = fetchOdds;