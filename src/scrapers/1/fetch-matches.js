const knex = require('../../../knex_connection');

const Sport = require('../../models/Sport');
const Competition = require('../../models/Competition');
const Match = require('../../models/Match');

const telegramBot = require('../../services/telegram-bot');
const Query = require('../../models/Query');

const normalizeString = require('../../utils/normalize-string');

const fetchFromNetworkTab = require('./fetch-from-network-tab');

const fetchNewMatches = async () => {
    try {
        let sports = await Sport
            // .where('name', 'in', ['Tenis', 'Šachy'])
            .where('name', 'in', ['Tenis'])
            .fetchAll();
        sports = sports.toJSON();

        for (let sport of sports) {
            try {

                console.log(`Fetching matches for ${sport.name}`)
        
                const baseUrl = 'https://www.tipsport.sk/kurzy/tenis-43';
                const targetJSONUrl = 'https://www.tipsport.sk/rest/offer/v2/offer?limit=75';

                const response = await fetchFromNetworkTab(baseUrl, targetJSONUrl);
            
                const competitions = response.offerSuperSports[0].tabs[0].offerCompetitionAnnuals;
                // const activeCompetitions = [];

                for (let competition of competitions) {
                    
                    // activeCompetitions.push(competition.id);
                    const newMatches = [];

                    let competitionDB = await Competition
                        .where({
                            provider_id: competition.competitionId,
                        }).fetch({ require: false });
                    
                    if (competitionDB) {
                        competitionDB = competitionDB.toJSON();
                        const competitionID = competitionDB.id;

                        for (let match of competition.matches) {
                            let matchDB = await Match.where({
                                provider_id: match.id,
                                name: match.name,
                            }).fetch({ require: false });

                            if (!matchDB) {
                                matchDB = await new Match({
                                    name: match.name,
                                    name_full: match.nameFull,
                                    provider_id: match.id,
                                    competition_id: competitionID,
                                    url: match.matchUrl,
                                }).save();
                                matchDB = matchDB.toJSON();
                                const matchID = matchDB.id;

                                // save odds
                                let odds = match?.oppRows?.[0]?.oppsTab || [];
                                odds = odds.filter(odd => Boolean(odd));
                                odds = odds.map(odd => ({
                                    label: odd.label,
                                    type: odd.type,
                                    odd: odd.odd,
                                    provider_id: odd.id,
                                    match_id: matchID,
                                }));

                                // await knex('odd').insert(odds);

                                newMatches.push({
                                    id: matchID,
                                    name: match.name,
                                    nameFull: match.nameFull,
                                    competitionName: competition.name,
                                    url: match.matchUrl,
                                    odds,
                                });
                            }
                        }

                        if (newMatches.length > 0) {
                            await telegramBot.sendNewMatchesNotification(competitionID, newMatches);
                            await handleQueriesLookup(newMatches);
                        }
                    }
                }

                // // deactivate competitions that are not on the site
                // await knex('competition')
                // .where('sport_id', sport.id)
                // .whereNotIn('provider_id', activeCompetitions)
                // .update({
                //     active: 0
                // })

            } catch (err) {
                console.log(err.message);
                // await knex('error')
                // .insert({
                //     sport_id: sport.id,
                //     status: err.status || 400,
                //     message: err.message
                // })
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const handleQueriesLookup = async (newMatches) => {
    try {

        let queries = await Query
            .where({
                active: true,
            })
            .fetchAll({
                withRelated: ['user'],
            });
        queries = queries.toJSON();

        for (let match of newMatches) {
            let matchName = match.nameFull || '';
            matchName = normalizeString(matchName);
            for (let query of queries) {
                if (matchName.includes(query.query)) {
                    await telegramBot.sendNewMatchWithQueryNotification(match, query.user, query.query);
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = fetchNewMatches;