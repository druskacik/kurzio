const moment = require('moment');

const config = require('../config');

const getOdds = require('./calls');

const Event = require('../models/Event');
const Timestamp = require('../models/Timestamp');
const Odd = require('../models/Odd');

const sendNotificationEmail = require('../services/mailer/emails/notification');

const sendEmails = async (eventID, odds) => {
  try {
    if (eventID === 1) {
      for (let odd of odds) {
        if (odd.name === 'Nie' && odd.odd > 2.5) {
          await sendNotificationEmail(odd.odd);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

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
      await sendEmails(event.id, odds);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = fetchOdds;