const Mustache = require('mustache');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const sendNewMatchWithQueryNotification = async (match, user, query) => {
    try {

        const templateText = await readFileAsync(__dirname + '/message.mustache');
        const text = Mustache.render(templateText, {
            matchName: match.name,
            matchUrl: `https://m.tipsport.sk/kurzy/zapas${match.url}`,
            competitionName: match.competitionName,
            odds: match.odds,
            notificationCommand: `/trackmatch_${match.id}`,
            query,
        });

        const chatID = user.telegram_chat_id;
        await sendTelegramMessage(chatID, text);

    } catch (err) {
        console.log(err);
    }
};

module.exports = sendNewMatchWithQueryNotification;
