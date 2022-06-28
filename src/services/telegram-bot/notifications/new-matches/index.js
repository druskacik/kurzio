const Mustache = require('mustache');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const Competition = require('../../../../models/Competition');

const sendNewMatchesNotification = async (competitionID, newMatches) => {
    try {

        let competition = await Competition
            .where({
                id: competitionID,
            })
            .fetch({
                withRelated: ['users'],
            });
        competition = competition.toJSON();

        const templateText = await readFileAsync(__dirname + '/message.mustache');
        const text = Mustache.render(templateText, {
            competitionName: competition.name,
            subsport: competition.subsport,
            competitionUrl: `https://m.tipsport.sk${competition.url}`,
            newMatches: newMatches.map(match => ({
                ...match,
                notificationCommand: `/trackmatch_${match.id}`,
            })),
        });

        competition.users.forEach(async user => {
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

module.exports = sendNewMatchesNotification;
