const knex = require('../../../../knex_connection');
const Email = require('../../../models/Email');

const confirmRequest = async (request, token) => {
  try {

    // TODO: this a bit chaotic, rewrite
    let email = await Email.where({
      address: request.email,
    }).fetchAll();

    email = email.toJSON();

    if (email.length === 0) {
      email = await Email.forge({
        address: request.email,
        active: 1,
        token,
      }).save();
      email = email.toJSON();
    } else {
      email = email[0];

      await knex('email')
        .where({
          address: request.email,
        })
        .update({
          active: 1,
          token,
        })

      await knex('email_sport_notification')
        .where({
          email_id: email.id,
        }).del();
      await knex('email_notification')
        .where({
          email_id: email.id,
        }).del();
    }


    const subscribedSports = request.sportIds.map(id => ({
      email_id: email.id,
      sport_id: id,
    }));
    await knex('email_sport_notification').insert(subscribedSports);

    const subscribedCompetitions = request.competitionIds.map(id => ({
      email_id: email.id,
      competition_id: id,
    }));
    await knex('email_notification').insert(subscribedCompetitions);

  } catch (err) {
    throw err;
  }
}

module.exports = confirmRequest;