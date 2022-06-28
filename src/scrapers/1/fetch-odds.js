const axios = require('axios');

const getHeaders = require('./utils');

const knex = require('../../../knex_connection');

const Sport = require('../../models/Sport');
const Match = require('../../models/Match');

const telegramBot = require('../../services/telegram-bot');

const fetchOdds = async () => {
    try {
        const headers = await getHeaders();
        let sports = await Sport
            .where('name', 'in', ['Tenis'])
            .fetchAll({
                withRelated: ['oddTypes.matches'],
            });
        sports = sports.toJSON();

        for (let sport of sports) {

            const newMatchOddTypes = {};

            for (let oddType of sport.oddTypes) {

                try {
                    const url = 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999';
                    const response = await axios.post(
                        url,
                        {
                            id: sport.provider_id,
                            results: false,
                            type: 'SUPERSPORT',
                            url: `https://www.tipsport.sk${sport.url}?matchViewFilters=${oddType.provider_id}-${sport.provider_id}`,
                            matchViewFilters: [{
                                id: {
                                    superGroupId: null,
                                    superSportId: sport.provider_id,
                                },
                                matchView: oddType.provider_id,
                            }],
                        },
                        {
                            headers,
                        }
                    );
                
                    const tabs = response.data.offerSuperSports[0].tabs;
                    const tab = readTabByPath(tabs, oddType.path);
                    const competitions = tab.offerCompetitionAnnuals;

                    const matchesWithOddType = [];
    
                    for (let competition of competitions) {
                        const matchIDs = competition.offerMatches.map(matchObject => matchObject.match.id);
                        matchesWithOddType.push(...matchIDs);
                    }

                    let matchesWithOddTypeDB = await Match
                        .where('provider_id', 'in', matchesWithOddType)
                        .fetchAll({ withRelated: ['users', 'competition'] });
                    matchesWithOddTypeDB = matchesWithOddTypeDB.toJSON();

                    const matchesWithOddTypeSaved = oddType.matches.map(match => match.id);
                    const matchesToAdd = matchesWithOddTypeDB.filter(match => !matchesWithOddTypeSaved.includes(match.id));

                    for (let match of matchesToAdd) {
                        if (!Object.keys(newMatchOddTypes).includes(`${match.id}`)) {
                            newMatchOddTypes[match.id] = {
                                matchName: match.name,
                                competitionName: match.competition.name,
                                matchUrl: `https://m.tipsport.sk/kurzy/zapas${match.url}`,
                                competitionUrl: `https://m.tipsport.sk${match.competition.url}`,
                                users: match.users,
                                newOddTypes: [oddType],
                            }
                        } else {
                            newMatchOddTypes[match.id].newOddTypes.push(oddType);
                        }
                    };

                    await knex('match_odd_type')
                        .insert(matchesToAdd.map(match => ({
                            match_id: match.id,
                            odd_type_id: oddType.id,
                        })))
    
                } catch (err) {
                    console.log(err.message);
                }
            }

            for (let matchID of Object.keys(newMatchOddTypes)) {
                const match = newMatchOddTypes[matchID];
                await telegramBot.sendNewOddsNotification(match);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const readTabByPath = (tabs, path) => {
    const pathParts = path.split('/');
    let focusedTabs = Array.from(tabs);
    let focusedTab;
    for (let pathPart of pathParts) {
        focusedTab = focusedTabs.find(tab => tab.matchView === pathPart);
        focusedTabs = focusedTab.subTabs;
    }
    return focusedTab;
}

module.exports = fetchOdds;