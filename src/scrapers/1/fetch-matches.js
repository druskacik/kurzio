const axios = require('axios');

const getHeaders = require('./utils');

const knex = require('../../../knex_connection');

const Sport = require('../../models/Sport');
const Competition = require('../../models/Competition');
const Match = require('../../models/Match');

const telegramBot = require('../../services/telegram-bot');

const fetchNewMatches = async () => {
    try {
        const headers = await getHeaders();
        let sports = await Sport
            .where('name', 'in', ['Tenis'])
            .fetchAll();
        sports = sports.toJSON();

        for (let sport of sports) {
            try {
                const url = 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999';
                const response = await axios.post(
                    url,
                    {
                        id: sport.provider_id,
                        results: false,
                        type: 'SUPERSPORT',
                        url: `https://www.tipsport.sk${sport.url}`,
                    },
                    {
                        headers,
                    }
                );
            
                // const competitions = response.data.offerSuperSports[0].tabs[0].offerCompetitions;
                const competitions = response.data.offerSuperSports[0].tabs[0].offerCompetitionAnnuals;
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

                        for (let matchObject of competition.offerMatches) {
                            const match = matchObject.match;
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
                                let odds = matchObject?.oppRows?.[0]?.oppsTab || [];
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
                                    name: match.name,
                                    url: match.matchUrl,
                                    odds,
                                });
                            }
                        }

                        if (newMatches.length > 0) {
                            await telegramBot.sendNewMatchesNotification(competitionID, newMatches);
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

module.exports = fetchNewMatches;