const axios = require('axios');

// const knex = require('../../../knex_connection');
const Sport = require('../../models/Sport');
const Competition = require('../../models/Competition');

const getHeaders = require('./utils');

const fetchNewSports = async () => {
    try {
        const headers = await getHeaders();

        const url = 'https://www.tipsport.sk/rest/offer/v3/sports?fromResults=false';
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

                const sportCategories = sport.children;
                for (let sportCategory of sportCategories) {
                    const competitions = sportCategory.children;
                    for (let competition of competitions) {
                        let competitionDB = await Competition.where({
                            name: competition.title,
                            provider_id: competition.id,
                        }).fetch({ require: false });

                        if (!competitionDB) {
                            await new Competition({
                                name: competition.title,
                                name_abbr: competition.titleAbbr,
                                provider_id: competition.id,
                                subsport: sportCategory.title,
                                sport_id: sportID,
                                url: competition.url,
                            }).save();

                            // TODO: notify about new competition
                        }
                    }
                }
            }
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = fetchNewSports;