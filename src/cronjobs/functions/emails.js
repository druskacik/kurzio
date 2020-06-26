const sendNotificationEmail = require('../../services/mailer/emails/new-competition');

const newCompetitionNotification = async (name) => {
  await sendNotificationEmail(name);
}

module.exports = {
  newCompetitionNotification,
};