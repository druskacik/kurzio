const Mustache = require('mustache');

const knex = require('../../../../../knex_connection');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const sendUntrackSportMessage = async (chatID, userID, sportIds) => {
    try {

        const sportRows = await knex('sport')
            .whereIn('id', sportIds)
            .select();
        const ids = sportRows.map(sportRow => sportRow.id);

        if (sportRows.length > 0) {
            await knex('user_sport_notification')
                .where({
                    user_id: userID,
                })
                .whereIn('sport_id', ids)
                .del();
    
            const templateText = await readFileAsync(__dirname + '/message.mustache');
            const text = Mustache.render(templateText, {
                sportRows,
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

module.exports = sendUntrackSportMessage;
