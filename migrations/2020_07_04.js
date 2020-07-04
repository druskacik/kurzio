exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('provider', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('url');
    })
      .then(() => {
        console.log('Table provider was created.');
      })
      .catch((err) => {
        console.log(err);
      }),
    knex.schema.createTable('sport', (table) => {
      table.increments('id').primary();
      table.string('sport_name');
      table.integer('provider_id').unsigned();
      table.foreign('provider_id').references('provider.id');
      table.string('url').notNullable();
      table.string('parameters');
    })
      .then(() => {
        console.log('Table sport was created.');
      })
      .catch((err) => {
        console.log(err);
      }),
    knex.schema.alterTable('competition', (table) => {
        table.dropColumn('type');
        table.integer('active').default(1);
        table.integer('sport_id').unsigned();
        table.foreign('sport_id').references('sport.id');
      })
        .then(() => {
          console.log('Columns active, sport_id were added to table competition. Column type was deleted.');
        })
        .catch((err) => {
          console.log(err);
        })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('sport')
    .then(() => {
      console.log('Table sport was deleted.');
    })
    .catch((err) => {
      console.log(err);
    }),
    knex.schema.dropTable('provider')
      .then(() => {
        console.log('Table provider was deleted.');
      })
      .catch((err) => {
        console.log(err);
      }),
      knex.schema.alterTable('competition', (table) => {
        table.string('type');
        table.dropColumn('active');
        table.dropColumn('sport_id');
      })
        .then(() => {
          console.log('Columns active, sport_id were dropped from table competition. Column type was added.');
        })
        .catch((err) => {
          console.log(err);
        })
  ])
}