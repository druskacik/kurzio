const axios = require('axios');

const knex = require('../../../knex_connection');
const getHeaders = require('../calls');
const emails = require('./emails');

const URL = 'https://m.tipsport.sk/rest/offer/v1/offer?limit=75';

const getCompsFromDatabase = async () => {
  try {
    const competitions = await knex('competition').select();
    const ids = competitions.map(competition => {
      return competition['provider_id'];
    })
    return ids;
  } catch (err) {
    throw err;
  }
}

const fetchNewCompetitions = async () => {
  try {
    const competitionIds = await getCompsFromDatabase();

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
      if (!competitionIds.includes(competition.id)) {
        await knex('competition').insert({
          provider_id: competition.id,
          name: competition.name,
          type: 'tennis'
        })
        console.log(`Competition ${competition.name} inserted to DB !`);
        // send notification email
        await emails.newCompetitionNotification(competition.name);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = fetchNewCompetitions;