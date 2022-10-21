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
                    const url = `${process.env.PROVIDER_URL}/rest/offer/v1/offer?limit=999999`;
                    const response = await axios.post(
                        url,
                        {
                            id: sport.provider_id,
                            results: false,
                            type: 'SUPERSPORT',
                            url: `${process.env.PROVIDER_URL}${sport.url}?matchViewFilters=${oddType.provider_id}-${sport.provider_id}`,
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

                    // TODO: the code below seriously needs a refactor
                    const matchesWithOddType = {};

                    // these variables determine how to take odd label for notification
                    const includeTabLabel = oddType.provider_id.includes('MOST_BALANCED');
                    const getLabelFromHeader = competitions[0].oppHeaders.length === competitions[0].offerMatches[0].oppRows[0].oppsTab.length;
                    const oppHeaders = competitions[0].oppHeaders;
    
                    // get all matches from all competitions with given odd type
                    for (let competition of competitions) {
                        competition.offerMatches.forEach(matchObject => {
                            let matchOdds = matchObject.oppRows[0].oppsTab.map((oddObject, i) => {
                                if (oddObject) {
                                    return {
                                        label: getLabelFromHeader ? (oppHeaders[i] + (includeTabLabel ? ` ${oddObject.label}` : '')) : oddObject.label,
                                        odd: oddObject.odd,
                                    };
                                };
                                return null;
                            });
                            matchOdds = matchOdds.filter(odd => Boolean(odd));
                            matchesWithOddType[matchObject.match.id] = {
                                odds: matchOdds,
                            }
                        })
                    }

                    // get all saved matches with given odd type
                    let matchesWithOddTypeDB = await Match
                        .where('provider_id', 'in', Object.keys(matchesWithOddType))
                        .fetchAll({ withRelated: ['users', 'competition'] });
                    matchesWithOddTypeDB = matchesWithOddTypeDB.toJSON();

                    const matchesWithOddTypeSaved = oddType.matches.map(match => match.id);
                    // add those matches that were not previously saved
                    const matchesToAdd = matchesWithOddTypeDB.filter(match => !matchesWithOddTypeSaved.includes(match.id));

                    for (let match of matchesToAdd) {

                        const oddTypeWithOdds = {
                            ...oddType,
                            odds: matchesWithOddType[`${match.provider_id}`].odds,
                        }

                        if (!Object.keys(newMatchOddTypes).includes(`${match.id}`)) {
                            newMatchOddTypes[match.id] = {
                                matchName: match.name,
                                competitionName: match.competition.name,
                                matchUrl: `${process.env.PROVIDER_URL}/kurzy/zapas${match.url}`,
                                competitionUrl: `${process.env.PROVIDER_URL}${match.competition.url}`,
                                users: match.users,
                                newOddTypes: [oddTypeWithOdds],
                            }
                        } else {
                            newMatchOddTypes[match.id].newOddTypes.push(oddTypeWithOdds);
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