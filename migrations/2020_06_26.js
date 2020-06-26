exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('competition', (table) => {
      table.increments('id').primary();
      table.integer('provider_id').notNullable();
      table.string('name').notNullable();
      table.string('type');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
      .then(() => {
        console.log('Table competition was created.');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('competition')
      .then(() => {
        console.log('Table competition was deleted.')
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}