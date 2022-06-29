const Mustache = require('mustache');

const knex = require('../../../../../knex_connection');

const Query = require('../../../../models/Query');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const sendUntrackQueryMessage = async (chatID, userID, queryIds) => {
    try {

        let queries = await Query
            .where('id', 'in', queryIds)
            .fetchAll();
        queries = queries.toJSON();

        if (queries.length > 0) {
            const followedQueriesIds = queries.map(query => query.id);
    
            await knex('query')
                .where({
                    user_id: userID,
                })
                .whereIn('id', followedQueriesIds)
                .update({
                    active: false,
                });
    
            const templateText = await readFileAsync(__dirname + '/message.mustache');
            const text = Mustache.render(templateText,{
                queries,
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

module.exports = sendUntrackQueryMessage;
