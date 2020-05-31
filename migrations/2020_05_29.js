exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('courses', (table) => {
      table.increments('id').primary();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.decimal('yes');
      table.decimal('no');
    })
      .then(() => {
        console.log('Table courses was created.');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('courses')
      .then(() => {
        console.log('Table courses was deleted.')
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}