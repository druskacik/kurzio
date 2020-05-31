const knex = require('../../knex_connection');

const seedDatabase = async () => {
  try {
    await knex('event').insert({
      id: 3,
      name: 'V roku 2020 sa uskutočnia cyklistické preteky Tour de France',
      type: 'society',
      url: 'https://www.tipsport.sk/rest/offer/v1/matches/3624919/event-tables?fromResults=false'
    });
    console.log('Ran seed successfully !');
  } catch (err) {
    console.log(err)
  }
  process.exit();
}

console.log('Seeding database ...');

seedDatabase();