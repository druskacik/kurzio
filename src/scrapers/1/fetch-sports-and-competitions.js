const axios = require('axios');

// const knex = require('../../../knex_connection');
const Sport = require('../../models/Sport');
const Competition = require('../../models/Competition');

const telegramBot = require('../../services/telegram-bot');

const getHeaders = require('./utils');

const fetchNewSports = async () => {
    try {
        const headers = await getHeaders();

        const url = `${process.env.PROVIDER_URL}/rest/offer/v4/sports?fromResults=false`;
        const response = await axios.get(url, {
            headers,
        });
        
        const categories = response.data.data.children; // these are 'Oblubene sporty' a 'Ostatne sporty'
        for (let category of categories) {

            const sports = category.children;
            for (let sport of sports) {

                let sportDB = await Sport.where({
                    name: sport.title,
                    provider_id: sport.id,
                }).fetch({ require: false });

                let sportID;
                if (!sportDB) {
                    console.log(`New sport ! ${sport.title}`);
                    let newSportDB = await new Sport({
                        name: sport.title,
                        provider_id: sport.id,
                        url: sport.url, 
                    }).save();
                    newSportDB = newSportDB.toJSON();
                    sportID = newSportDB.id;
                    // TODO: send notification about new sport

                } else {
                    sportDB = sportDB.toJSON();
                    sportID = sportDB.id;
                }

                // const activeCompetitions = [];
                const sportCategories = sport.children;
                for (let sportCategory of sportCategories) {
                    const competitions = sportCategory.children;
                    for (let competition of competitions) {
                        // activeCompetitions.push(competition.id);

                        let competitionDB = await Competition.where({
                            name: competition.title,
                            provider_id: competition.id,
                        }).fetch({ require: false });

                        if (!competitionDB) {
                            competitionDB = await new Competition({
                                name: competition.title,
                                name_abbr: competition.titleAbbr,
                                provider_id: competition.id,
                                subsport: sportCategory.title,
                                sport_id: sportID,
                                url: competition.url,
                            }).save();
                            competitionDB = competitionDB.toJSON();

                            await telegramBot.sendNewCompetitionNotification(sportID, competitionDB);
                        }
                    }
                }

                // deactivate competitions that are not on the site
                // await knex('competition')
                //     .where('sport_id', sportID)
                //     .where('active', true)
                //     .whereNotIn('provider_id', activeCompetitions)
                //     .update({
                //         active: false,
                //         updated_at: knex.fn.now(),
                //     });
            }
        }

    } catch (err) {
        console.log(err);
        await telegramBot.sendRequestNotSuccessfulNotification(err, 'fetchNewSports');
    }
}

module.exports = fetchNewSports;