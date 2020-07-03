exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('match', (table) => {
      table.increments('id').primary();
      table.string('provider_id').notNullable();
      table.string('name');
      table.integer('competition_id').unsigned();
      table.foreign('competition_id').references('competition.id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
      .then(() => {
        console.log('Table match was created.');
      })
      .catch((err) => {
        console.log(err);
      }),
    knex.schema.createTable('email_notification', (table) => {
      table.increments('id').primary();
      table.integer('email_id').unsigned();
      table.foreign('email_id').references('email.id');
      table.integer('competition_id').unsigned();
      table.foreign('competition_id').references('competition.id');
    })
      .then(() => {
        console.log('Table email_notification was created.');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('match')
      .then(() => {
        console.log('Table match was deleted.');
      })
      .catch((err) => {
        console.log(err);
      }),
    knex.schema.dropTable('email_notification')
      .then(() => {
        console.log('Table email_notification was deleted.');
      })
      .catch((err) => {
        console.log(err);
      })
  ])
}