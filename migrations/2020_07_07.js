exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('subscription_request', (table) => {
      table.increments('id').primary();
      table.string('request_json');
      table.string('confirmation_token').notNullable();
      table.integer('active').defaultTo(1);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
      .then(() => {
        console.log('Table subscription_request was created.');
      })
      .catch((err) => {
        console.log(err);
      }),
    knex.schema.alterTable('email', (table) => {
      table.string('token').notNullable();
    })
      .then(() => {
        console.log('Column token was added to table email');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('subscription_request')
    .then(() => {
      console.log('Table subscription_request was deleted.');
    })
    .catch((err) => {
      console.log(err);
    }),
    knex.schema.alterTable('email', (table) => {
      table.dropColumn('token');
    })
      .then(() => {
        console.log('Column token was dropped from table email');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}