const fetchOddsJob = require('./fetch-political-odds');
const fetchCompetitionsJob = require('./competitions-and-matches');
const cleanDBJob = require('./clean-database');
const fetchAllOddsJob = require('./all-odds');

// fetchOddsJob.start();
// fetchCompetitionsJob.start();
cleanDBJob.start();
fetchAllOddsJob.start();