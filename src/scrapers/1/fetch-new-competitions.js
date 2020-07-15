const axios = require('axios');

const knex = require('../../../knex_connection');
const getHeaders = require('./utils');
const newCompetitionNotification = require('../../notifications/new-competition');
const getNewMatches = require('./get-new-matches');
const getSports = require('./helpers/get-sports');

const Competition = require('../../models/Competition');

const fetchNewCompetitions = async () => {
  try {
    const headers = await getHeaders();
    const sports = await getSports();
    for (let sport of sports) {
      try {
        const url = sport.url;
        const response = await axios.post(
          url,
          JSON.parse(sport.parameters),
          {
            headers,
          }
        );
    
        const competitions = response.data.offerSuperSports[0].tabs[0].offerCompetitions;
        const activeCompetitions = [];
        for (let competition of competitions) {
          activeCompetitions.push(competition.id);
          let competitionID = '';
          const savedComp = await knex('competition')
            .where({
              provider_id: competition.id
            }).select();
          if (savedComp.length > 0) {
            competitionID = savedComp[0].id;
            if (savedComp[0].active === 0) {
              await knex('competition')
                .where({
                  provider_id: competition.id,
                })
                .update({
                  active: 1
                })
              await newCompetitionNotification(sport, competition.name);
            }
          } else {
            let response = await Competition.forge({
              provider_id: competition.id,
              name: competition.name,
              sport_id: sport.id,
            }).save();
            response = response.toJSON();
            competitionID = response.id;
            console.log(`Competition ${competition.name} inserted to DB !`);  
            await newCompetitionNotification(sport, competition.name);
          }
          // get new matches and notify about them
          await getNewMatches({
            ...competition,
            clientID: competitionID,
          });
        }

        // deactivate competitions that are not on the site
        await knex('competition')
          .where('sport_id', sport.id)
          .whereNotIn('provider_id', activeCompetitions)
          .update({
            active: 0
          })

      } catch (err) {
        console.log(err.message);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = fetchNewCompetitions;