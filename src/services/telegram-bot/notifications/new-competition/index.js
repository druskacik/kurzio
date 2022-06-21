const Mustache = require('mustache');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const Sport = require('../../../../models/Sport');

const sendNewCompetitionNotification = async (sportID, competition) => {
    try {

        let sport = await Sport
            .where({
                id: sportID,
            })
            .fetch({
                withRelated: ['users'],
            });
        sport = sport.toJSON();

        const templateText = await readFileAsync(__dirname + '/message.mustache');
        const text = Mustache.render(templateText, {
            sportName: sport.name,
            competitionName: competition.name,
            subsport: competition.subsport,
            competitionUrl: `https://m.tipsport.sk${competition.url}`,
        });

        sport.users.forEach(async user => {
            try {
                const chatID = user.telegram_chat_id;
                await sendTelegramMessage(chatID, text);
            } catch (err) {
                console.log(err);
            }
        });

    } catch (err) {
        console.log(err);
    }
};

module.exports = sendNewCompetitionNotification;
