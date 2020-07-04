const knex = require('../../knex_connection');

const sendNotificationEmail = require('../services/mailer/emails/new-competition');

const newCompetitionNotification = async (name) => {
  const emailList = await knex('email').select();
  const addresses = emailList.map(row => row.address);
  for (let address of addresses) {
    await sendNotificationEmail(address, name);
  }
}

module.exports = newCompetitionNotification;