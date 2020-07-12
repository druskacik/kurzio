const express = require('express');

const router = express.Router();

const Sport = require('../../models/Sport');
const getSlovakName = require('./helpers/get-slovak-name');

router.route('/')
  .get(async (req, res) => {
    try {
      let sports = await Sport
        .fetchAll({
          withRelated: ['competitions']
        });
      sports = sports.toJSON();
      sports = sports.map(sport => ({
        ...sport,
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