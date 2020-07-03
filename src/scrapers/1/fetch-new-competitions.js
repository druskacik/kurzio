const axios = require('axios');

const knex = require('../../../knex_connection');
const getHeaders = require('./utils');
const emails = require('../../cronjobs/functions/emails');
const getNewMatches = require('./get-new-matches');

const URL = 'https://m.tipsport.sk/rest/offer/v1/offer?limit=75';

const fetchNewCompetitions = async () => {
  try {
    const headers = await getHeaders();
    const response = await axios.post(URL, {
        type: 'SUPERSPORT',
        id: 43,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/tenis-43'
      },
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
        const response = await knex('competition').insert({
          provider_id: competition.id,
          name: competition.name,
          type: 'tennis'
        });
        competitionID = response[0];
        console.log(`Competition ${competition.name} inserted to DB !`);  
        await emails.newCompetitionNotification(competition.name);
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

module.exports = fetchNewCompetitions;