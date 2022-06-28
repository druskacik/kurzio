const Mustache = require('mustache');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const sendNewOddsNotification = async (match) => {
    try {

        const templateText = await readFileAsync(__dirname + '/message.mustache');
        const text = Mustache.render(templateText, {
            matchName: match.matchName,
            competitionName: match.competitionName,
            // TODO: include match url
            competitionUrl: match.competitionUrl,
            oddTypes: match.newOddTypes,
        });

        for (let user of match.users) {
            try {
                const chatID = user.telegram_chat_id;
                await sendTelegramMessage(chatID, text);
            } catch (err) {
                console.log(err);
            }
        };

    } catch (err) {
        console.log(err);
    }
};

module.exports = sendNewOddsNotification;
