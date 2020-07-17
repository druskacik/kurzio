const fetchOddsJob = require('./fetch-political-odds');
const fetchCompetitionsJob = require('./competitions-and-matches');
const cleanDBJob = require('./clean-database');

fetchOddsJob.start();
fetchCompetitionsJob.start();
cleanDBJob.start();