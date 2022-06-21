const Mustache = require('mustache');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const Sport = require('../../../../models/Sport');

const sendSportsMessage = async (chatID) => {
    try {

        let sports = await Sport.fetchAll();
        sports = sports.toJSON();

        sports = sports.map(sport => {
            const notificationCommand = `/tracksport_${sport.id}`;
            return {
                ...sport,
                notificationCommand,
            }
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

module.exports = sendSportsMessage;
