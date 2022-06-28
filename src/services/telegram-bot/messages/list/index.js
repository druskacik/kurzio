const Mustache = require('mustache');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const Sport = require('../../../../models/Sport');

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

        if (text.length > 4095) {

            const splitIndex = [0];
            const textParts = [];

            // max length is 4096
            // 3800 should be a safe margin
            // TODO: make this more exact
            for (let i = 0; i < Math.floor(text.length/3800); i += 1) {
                const start = (i+1) * 3800;
                const index = text.indexOf('\n', start);
                splitIndex.push(index);
            }
            splitIndex.push(text.length);

            for (let i = 0; i < splitIndex.length - 1; i += 1) {
                const textPart = text.substring(splitIndex[i], splitIndex[i + 1]);
                textParts.push(textPart);
            }

            for (let textPart of textParts) {
                await sendTelegramMessage(chatID, textPart);
            }

        } else {
            await sendTelegramMessage(chatID, text);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendListMessage;
