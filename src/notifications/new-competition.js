const knex = require('../../knex_connection');

const sendNotificationEmail = require('../services/mailer/emails/new-competition');
const getSlovakName = require('../utils/get-slovak-name');

const newCompetitionNotification = async (sport, name) => {
  for (let email of sport.emails) {
    if (email.address === 'druskajuraj@gmail.com' && name.substring(0, 3) === 'ITF') {
      console.log('Not sending email because Juro does not really bet on ITF competitions.');
    } else {
      await sendNotificationEmail(email, {
        sportName: getSlovakName(sport.sport_name),
        competition: name,
      });
    }
  }
}

module.exports = newCompetitionNotification;