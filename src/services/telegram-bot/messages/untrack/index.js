const Mustache = require('mustache');

const knex = require('../../../../../knex_connection');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const sendUntrackMessage = async (chatID, userID, competitionIds) => {
    try {

        const compRows = await knex('competition')
            .whereIn('id', competitionIds)
            .select();
        const compIds = compRows.map(compRow => compRow.id);

        if (compRows.length > 0) {
            await knex('user_competition_notification')
                .where({
                    user_id: userID,
                })
                .whereIn('competition_id', compIds)
                .del();
    
            const templateText = await readFileAsync(__dirname + '/message.mustache');
            const text = Mustache.render(templateText, {
                compRows,
            });
    
            await sendTelegramMessage(chatID, text);
        } else {
            const templateText = await readFileAsync(__dirname + '/message-help.mustache');
            const text = Mustache.render(templateText);
            await sendTelegramMessage(chatID, text);
        }

    } catch (err) {
        console.log(err);
    }
};

module.exports = sendUntrackMessage;
