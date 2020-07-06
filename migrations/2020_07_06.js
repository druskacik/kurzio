exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('email_sport_notification', (table) => {
      table.increments('id').primary();
      table.integer('email_id').unsigned();
      table.foreign('email_id').references('email.id');
      table.integer('sport_id').unsigned();
      table.foreign('sport_id').references('sport.id');
    })
      .then(() => {
        console.log('Table email_sport_notification was created.');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('email_sport_notification')
    .then(() => {
      console.log('Table email_sport_notification was deleted.');
    })
    .catch((err) => {
      console.log(err);
    })
  ])
}