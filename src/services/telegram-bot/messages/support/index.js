const Mustache = require('mustache');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const sendSupportMessage = async (chatID) => {
    try {

        const templateText = await readFileAsync(__dirname + '/message.mustache');
        const text = Mustache.render(templateText);
        await sendTelegramMessage(chatID, text);
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendSupportMessage;
