const Competition = require('../../models/Competition');

const getFollowingEmails = async (competitionID) => {
  try {
    let competition = await Competition
      .where({
        id: competitionID,
      })
      .fetch({
        withRelated: [
          {
            emails: function (query) {
              query.where({ active: 1 }).select();
            }
          }
        ],
      })
    competition = competition.toJSON();
    return competition.emails;
  } catch (err) {
    console.log(err);
    return [];
  }
}

module.exports = getFollowingEmails;