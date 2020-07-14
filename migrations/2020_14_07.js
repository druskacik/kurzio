exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('subscription_request', (table) => {
      table.string('request_json', 10000).alter();
    })
      .then(() => {
        console.log('Maximal length of column request_json in table subscription_request was increased to 10000.');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.alterTable('subscription_request', (table) => {
      table.string('request_json').alter();
    })
      .then(() => {
        console.log('Maximal length of column request_json in table subscription_request was decreased to default (255).');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}