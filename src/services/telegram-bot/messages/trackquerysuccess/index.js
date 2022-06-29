const Mustache = require('mustache');

const knex = require('../../../../../knex_connection');

const sendTelegramMessage = require('../../send-message');

const readFileAsync = require('../../../../utils/read-file-async');
const normalizeString = require('../../../../utils/normalize-string');

const sendTrackQuerySuccessMessage = async (chatID, userID, messageText) => {
    try {

        let queries = messageText.split('\n');
        queries = queries.map(query => query.trim());
        queries = queries.filter(query => query.length >= 3);
        queries = queries.map(query => normalizeString(query));

        const queriesToInsert = queries.map(query => ({
            user_id: userID,
            query,
        }));

        await knex('query')
            .insert(queriesToInsert);

        const templateText = await readFileAsync(__dirname + '/message.mustache');
        const text = Mustache.render(templateText, {
            queries,
        });

        await sendTelegramMessage(chatID, text);
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendTrackQuerySuccessMessage;
