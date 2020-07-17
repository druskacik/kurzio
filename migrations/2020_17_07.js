exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('competition', (table) => {
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
      .then(() => {
        console.log('Column updated_at was added to table competition.');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.alterTable('competition', (table) => {
      table.dropColumn('updated_at');
    })
      .then(() => {
        console.log('Column updated_at was dropped from table competition.');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}