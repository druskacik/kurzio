const Competition = require('../../models/Competition');

const getFollowingEmails = async (competitionID) => {
  try {
    let competition = await Competition
      .where({
        id: competitionID,
      })
      .fetch({
        withRelated: 'emails',
      })
    competition = competition.toJSON();
    return competition.emails;
  } catch (err) {
    console.log(err);
    return [];
  }
}

module.exports = getFollowingEmails;