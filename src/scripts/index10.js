const fetchNewCompetitions = require('../cronjobs/functions/fetch-new-competitions');

const runJob = async () => {
  try {
    await fetchNewCompetitions();
    console.log('Script run successfully !');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

console.log('Running scheduled job (fetching new competitions) ... ');

runJob();