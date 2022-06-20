const sendNotificationEmail = require('../services/mailer/emails/new-matches');

const sendNewMatchesNotification = async (competition, matches) => {
    try {
        const emails = await getFollowingEmails(competition.clientID);
        for (let email of emails) {
            await sendNotificationEmail(email, {
                competition,
                matches,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = sendNewMatchesNotification;