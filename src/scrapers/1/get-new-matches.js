const knex = require('../../../knex_connection');
const sendNewMatchesNotification = require('../../notifications/new-matches');

const getNewMatches = async (competition) => {
  try {
    const newMatches = [];
    for (let matchData of competition.offerMatches) {
      const match = matchData.match;
      const response = await knex('match')
        .where({
          provider_id: match.id,
        }).select();
      if (response.length === 0) {
        console.log('adding match for competition: ', competition);
        await knex('match').insert({
          provider_id: match.id,
          competition_id: competition.clientID,
          name: match.nameFull,
        });
        newMatches.push(match.nameFull);
      }
    }
    if (newMatches.length > 0) {
      // notify about new matches
      await sendNewMatchesNotification(competition, newMatches);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = getNewMatches;