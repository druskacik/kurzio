const express = require('express');

const router = express.Router();

const Sport = require('../../models/Sport');
const getSlovakName = require('../../utils/get-slovak-name');

// TODO: this bullshit function deserves it's own file (especially the football part)
const sortCompetitions = (sport) => {
  if (sport.sport_name === 'football') {
    const competitions = [];
    sport.competitions.map(competition => {
      if ([3146, 3108, 3120, 6520, 3210].includes(competition.provider_id)) {
        competitions.push(competition);
      }
    })
    sport.competitions.map(competition => {
      if ([120, 138, 118, 130, 140, 127].includes(competition.provider_id)) {
        competitions.push(competition);
      }
    })
    sport.competitions.map(competition => {
      if (!competitions.includes(competition) && competition.name[0] === '1') {
        competitions.push(competition);
      }
    })

    remainingCompetitions = sport.competitions.filter(c => !competitions.includes(c));
    return competitions.concat(remainingCompetitions.sort((comp1, comp2) => comp1.name > comp2.name ? 1 : -1));
  }
  return sport.competitions.sort((comp1, comp2) => comp1.name > comp2.name ? 1 : -1);
}

router.route('/')
  .get(async (req, res) => {
    try {
      let sports = await Sport
        .fetchAll({
          withRelated: [
            {
              competitions: function (query) {
                query.where({ active: 1 }).select();
              }
            }
          ]
        });
      sports = sports.toJSON();
      sports = sports.map(sport => ({
        ...sport,
        competitions: sortCompetitions(sport),
        slovakName: getSlovakName(sport.sport_name)
      }));
      res.status(200)
        .json(sports);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500)
        .json({
          status: err.status || 500,
          message: err.message,
        })
    }
  })

module.exports = router;