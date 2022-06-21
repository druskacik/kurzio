const Mustache = require('mustache');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const User = require('../../../../models/User');

const sendSettingsMessage = async (chatID) => {
    try {
    
        let user = await User.where({
            telegram_chat_id: chatID,
        }).fetch({
            withRelated: ['sports', 'competitions']
        });
        user = user.toJSON();

        if (user.sports.length === 0 && user.competitions.length === 0) {
            const templateText = await readFileAsync(__dirname + '/message-no-settings.mustache');
            const text = Mustache.render(templateText);
            await sendTelegramMessage(chatID, text);
        } else {

            user.competitions = user.competitions.map(competition => {
                const untrackCommand = `/untrack_${competition.id}`;
                return {
                    ...competition,
                    untrackCommand,
                }
            });

            user.sports = user.sports.map(sport => {
                const untrackCommand = `/untracksport_${sport.id}`;
                return {
                    ...sport,
                    untrackCommand,
                }
            });

            const templateText = await readFileAsync(__dirname + '/message.mustache');
            const text = Mustache.render(templateText, {
                ...user,
                followsSports: user.sports.length > 0,
                followsCompetitions: user.competitions.length > 0,
            });
            await sendTelegramMessage(chatID, text);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendSettingsMessage;
