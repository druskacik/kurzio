exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('error', (table) => {
      table.increments('id').primary();
      table.integer('sport_id').unsigned();
      table.foreign('sport_id').references('sport.id');
      table.integer('status');
      table.string('message').defaultTo('Unknown error !');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
      .then(() => {
        console.log('Table error was created.');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('error')
    .then(() => {
      console.log('Table error was deleted.');
    })
    .catch((err) => {
      console.log(err);
    })
  ])
}