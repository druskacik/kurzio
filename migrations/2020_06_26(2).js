exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('email', (table) => {
      table.increments('id').primary();
      table.string('address').notNullable();
      table.integer('active');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
      .then(() => {
        console.log('Table email was created.');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('email')
      .then(() => {
        console.log('Table email was deleted.');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}