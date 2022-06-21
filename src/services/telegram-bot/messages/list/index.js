const Mustache = require('mustache');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const Sport = require('../../../../models/Sport');
// const Competition = require('../../../../models/Competition');

const sendListMessage = async (chatID) => {
    try {

        // TODO: so far, only Tenis is listed
        let sports = await Sport
            .where('name', 'in', ['Tenis'])
            .fetchAll({ withRelated: ['competitions'] });
        sports = sports.toJSON();

        sports = sports.map(sport => {
            sport.competitions = sport.competitions.map(competition => {
                const notificationCommand = `/track_${competition.id}`
                return {
                    ...competition,
                    notificationCommand,
                }
            })
            return sport;
        })

        const templateText = await readFileAsync(__dirname + '/message.mustache');
        const text = Mustache.render(templateText, {
            sports,
        });

        await sendTelegramMessage(chatID, text);
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendListMessage;
