const knex = require('../../knex_connection');

const sendNotificationEmail = require('../services/mailer/emails/new-competition');

const newCompetitionNotification = async (emailList, name) => {
  const addresses = emailList.map(row => row.address);
  for (let address of addresses) {
    await sendNotificationEmail(address, name);
  }
}

module.exports = newCompetitionNotification;