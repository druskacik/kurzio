const fetchOddsJob = require('./fetch-political-odds');
const fetchCompetitionsJob = require('./competitions-and-matches');

fetchOddsJob.start();
fetchCompetitionsJob.start();