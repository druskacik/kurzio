const fetchOdds = require('../cronjobs/functions/fetch-odds');

const runJobs = async () => {
  try {
    await fetchOdds();
    console.log('Script run successfully !');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

console.log('Running scheduled job ...');

runJobs();