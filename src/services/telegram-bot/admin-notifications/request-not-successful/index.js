const Mustache = require('mustache');

const knex = require('../../../../../knex_connection');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const sendRequestNotSuccessfulNotification = async (error, context) => {
    try {

        const notificationStatus = await knex('admin_notification')
            .where({
                type: 'REQUEST_ERROR',
            })
            .first();

        if (!notificationStatus.locked) {
            const templateText = await readFileAsync(__dirname + '/message.mustache');
            const text = Mustache.render(templateText, {
                error,
                context,
            });
    
            const chatID = process.env.ADMIN_TELEGRAM_CHAT_ID;
            await sendTelegramMessage(chatID, text);
    
            await knex('admin_notification')
                .where({
                    type: 'REQUEST_ERROR',
                })
                .update({
                    locked: true,
                });
        }

    } catch (err) {
        console.log(err);
    }
};

module.exports = sendRequestNotSuccessfulNotification;
