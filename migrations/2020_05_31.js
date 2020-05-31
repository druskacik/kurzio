exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('event', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('type').default('politics');
      table.string('url');
    })
      .then(() => {
        console.log('Table event was created.');
      })
      .catch((err) => {
        console.log(err);
      }),
      knex.schema.createTable('fetch_timestamp', (table) => {
        table.increments('id').primary();
        table.integer('event_id').unsigned();
        table.foreign('event_id').references('event.id');
        table.timestamp('created_at');
      })
        .then(() => {
          console.log('Table fetch_timestamp was created.');
        })
        .catch((err) => {
          console.log(err);
        }),
      knex.schema.createTable('odd', (table) => {
        table.increments('id').primary();
        table.integer('fetch_timestamp_id').unsigned();
        table.foreign('fetch_timestamp_id').references('fetch_timestamp.id');
        table.string('name').notNullable();
        table.decimal('value').notNullable();
      })
        .then(() => {
          console.log('Table odd was created.');
        })
        .catch((err) => {
          console.log(err);
        })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('odd')
      .then(() => {
        console.log('Table odd was deleted.')
      })
      .catch((err) => {
        console.log(err);
      }),
    knex.schema.dropTable('fetch_timestamp')
      .then(() => {
        console.log('Table fetch_timestamp was deleted.')
      })
      .catch((err) => {
        console.log(err);
      }),
    knex.schema.dropTable('event')
      .then(() => {
        console.log('Table event was deleted.')
      })
      .catch((err) => {
        console.log(err);
      }),
  ])
}