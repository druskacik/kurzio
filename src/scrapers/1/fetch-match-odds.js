const axios = require('axios');
const moment = require('moment');

const knex = require('../../../knex_connection');
const OddType = require('../../models/OddType');

const config = require('../../config');

const getHeaders = require('./utils');

const getMatchOdds = async(match, headers, sportID) => {
  try {
    let url = 'https://m.tipsport.sk/rest/offer/v1/matches/@MATCH_ID/event-tables';

    url = url.replace('@MATCH_ID', `${match.providerID}`);

    const currentTime = moment().format(config.datetimeFormat);

    const response = await axios.get(
      url,
      {
        headers,
      }
    );

    const eventTables = response.data.eventTables;

    for (let eventTable of eventTables) {

      let oddTypeID = null;
      
      const savedOddType = await knex('odd_type')
        .where({
          sport_id: sportID,
          // provider_id: eventTable.id,
          name: eventTable.name,
        })
        .select()

      if (savedOddType.length > 0) {
        oddTypeID = savedOddType[0].id;
      } else {
        let dbResponse = await OddType.forge({
          name: eventTable.name,
          sport_id: sportID,
          provider_id: eventTable.id,
        }).save()
        dbResponse = dbResponse.toJSON();
        oddTypeID = dbResponse.id;
      }

      await insertNewOdds(match.id, eventTable, oddTypeID, currentTime);
    }

  } catch (err) {
    console.log(err);
  }
}

const insertNewOdds = async (matchID, eventTable, oddTypeID, currentTime) => {
  for (let box of eventTable.boxes) {
    for (let cell of box.cells) {
      try {
        await knex('odd_v2').insert({
          match_id: matchID,
          odd_type_id: oddTypeID,
          box_name: box.name,
          name: cell.name,
          value: cell.odd,
          opp_number: cell.oppNumber,
          created_at: currentTime,
        })
      } catch (err) {
        console.log(err);
      }
    }
  }
}

module.exports = getMatchOdds;