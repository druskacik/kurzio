const axios = require('axios');
const moment = require('moment');

const knex = require('../../../knex_connection');
const getHeaders = require('./utils');
const newCompetitionNotification = require('../../notifications/new-competition');
const getNewMatches = require('./get-new-matches');
const getSports = require('./helpers/get-sports');

const Competition = require('../../models/Competition');

const config = require('../../config');

const fetchNewCompetitions = async (alsoFetchOdds) => {
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
    
        // const competitions = response.data.offerSuperSports[0].tabs[0].offerCompetitions;
        const competitions = response.data.offerSuperSports[0].tabs[0].offerCompetitionAnnuals;
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
                  active: 1,
                  updated_at: moment().format(config.datetimeFormat),
                })
              // notify only if the competition was inactive for more than 2 days
              if (Date.now() - new Date(savedComp[0].updated_at) > (24*60*60*1000)*2) {
                await newCompetitionNotification(sport, competition.name);
              }
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
          await getNewMatches(
            {
              ...competition,
              clientID: competitionID,
            },
            headers,
            sport.id,
            alsoFetchOdds
          );
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
        await knex('error')
          .insert({
            sport_id: sport.id,
            status: err.status || 400,
            message: err.message
          })
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = fetchNewCompetitions;