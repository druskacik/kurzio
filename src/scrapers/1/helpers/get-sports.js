const knex = require('../../../../knex_connection');

const Sport = require('../../../models/Sport');

const getSports = async () => {
  try {
    const sports = await Sport.fetchAll({
      withRelated: [
        {
          emails: function (query) {
            query.where({ active: 1 }).select();
          }
        }
      ],
    })
    return sports.toJSON();
  } catch (err) {
    throw err;
  }
}

module.exports = getSports;