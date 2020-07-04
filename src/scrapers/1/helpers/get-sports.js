const knex = require('../../../../knex_connection');

const getSports = async () => {
  try {
    const sports = await knex('sport').select();
    return sports;
  } catch (err) {
    throw err;
  }
}

module.exports = getSports;