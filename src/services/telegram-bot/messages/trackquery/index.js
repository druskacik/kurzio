const Mustache = require('mustache');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const sendTrackQueryMessage = async (chatID) => {
    try {

        const templateText = await readFileAsync(__dirname + '/message.mustache');
        const text = Mustache.render(templateText);

        const forceReply = {
            force_reply: true,
            input_field_placeholder: 'napr. djokovic'
        }

        await sendTelegramMessage(chatID, text, parseMode = 'HTML', replyMarkup = forceReply);
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendTrackQueryMessage;
