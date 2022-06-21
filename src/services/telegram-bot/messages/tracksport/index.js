const Mustache = require('mustache');

const knex = require('../../../../../knex_connection');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const sendTrackSportMessage = async (chatID, userID, sportIds) => {
    try {

        const sportRows = await knex('sport')
            .whereIn('id', sportIds)
            .select();

        if (sportRows.length > 0) {
            const sportIds = sportRows.map(sportRow => sportRow.id);
    
            await knex('user_sport_notification')
                .where({
                    user_id: userID,
                })
                .whereIn('sport_id', sportIds)
                .del();
    
            sportIds.forEach(async compID => {
            await knex('user_sport_notification')
                .insert({
                    user_id: userID,
                    sport_id: compID,
                })
            });
    
            const templateText = await readFileAsync(__dirname + '/message.mustache');
            const text = Mustache.render(templateText,{
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

module.exports = sendTrackSportMessage;
