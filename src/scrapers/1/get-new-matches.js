const knex = require('../../../knex_connection');
const sendNewMatchesNotification = require('../../notifications/new-matches');

const Match = require('../../models/Match');

const getMatchOdds = require('./fetch-match-odds');

const getNewMatches = async (competition, headers, sportID, alsoFetchOdds) => {
  try {
    const newMatches = [];
    for (let matchData of competition.offerMatches) {
      const match = matchData.match;

      const response = await knex('match')
        .where({
          provider_id: match.id,
        }).select();
      
      let matchID = null;

      // insert match if it's new
      if (response.length > 0) {
        matchID = response[0].id;
      } else {
        // await knex('match').insert({
        //   provider_id: match.id,
        //   competition_id: competition.clientID,
        //   name: match.nameFull,
        // });
        let dbResponse = await Match.forge({
          provider_id: match.id,
          competition_id: competition.clientID,
          name: match.nameFull,
        }).save()
        dbResponse = dbResponse.toJSON();
        matchID = dbResponse.id;

        newMatches.push(match.nameFull);
      }

      // fetch match odds
      if (alsoFetchOdds) {
        console.log('Fetching odds for match', match.nameFull);
        await getMatchOdds({
          id: matchID,
          providerID: match.id,
        }, headers, sportID);
      }
    }
    if (newMatches.length > 0) {
      console.log(`Notifying about ${newMatches.length} new matches:`);
      for (let matchName of newMatches) {
        console.log(matchName);
      }
      // notify about new matches
      await sendNewMatchesNotification(competition, newMatches);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = getNewMatches;