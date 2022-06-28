const Mustache = require('mustache');

const knex = require('../../../../../knex_connection');

const Match = require('../../../../models/Match');

const sendTelegramMessage = require('../../send-message');
const readFileAsync = require('../../../../utils/read-file-async');

const sendUntrackMatchMessage = async (chatID, userID, matchIds) => {
    try {

        let matchRows = await Match
            .where('id', 'in', matchIds)
            .fetchAll({ withRelated: ['competition'] });
        matchRows = matchRows.toJSON();
        matchRows = matchRows.map(matchRow => ({
            id: matchRow.id,
            name: matchRow.name,
            competitionName: matchRow.competition.name,
        }));

        if (matchRows.length > 0) {
            const followedMatchIds = matchRows.map(matchRow => matchRow.id);
    
            await knex('user_match_notification')
                .where({
                    user_id: userID,
                })
                .whereIn('match_id', followedMatchIds)
                .del();
    
            const templateText = await readFileAsync(__dirname + '/message.mustache');
            const text = Mustache.render(templateText,{
                matchRows,
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

module.exports = sendUntrackMatchMessage;
