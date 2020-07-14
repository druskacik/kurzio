const knex = require('../../knex_connection');

const sendNotificationEmail = require('../services/mailer/emails/new-competition');
const getSlovakName = require('../utils/get-slovak-name');

const newCompetitionNotification = async (sport, name) => {
  for (let email of sport.emails) {
    await sendNotificationEmail(email, {
      sportName: getSlovakName(sport.sport_name),
      competition: name,
    });
  }
}

module.exports = newCompetitionNotification;