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
        for (let competition of competitions) {
          let competitionID = '';
          const savedComp = await knex('competition')
            .where({
              provider_id: competition.id
            }).select();
          if (savedComp.length > 0) {
            competitionID = savedComp[0].id;
          } else {
            let response = await Competition.forge({
              provider_id: competition.id,
              name: competition.name,
              sport_id: sport.id,
            }).save();
            response = response.toJSON();
            competitionID = response.id;
            console.log(`Competition ${competition.name} inserted to DB !`);  
            await newCompetitionNotification(sport.emails, competition.name);
          }
          // get new matches and notify about them
          await getNewMatches({
            ...competition,
            clientID: competitionID,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = fetchNewCompetitions;