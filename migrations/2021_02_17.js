exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('odd_type', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().collate('utf8_general_ci');
      table.integer('sport_id').unsigned();
      table.foreign('sport_id').references('sport.id');
      table.string('provider_id');
    })
      .then(() => {
        console.log('Table odd_type was created.');
      })
      .catch((err) => {
        console.log(err);
      }),
      knex.schema.createTable('match_odd_type', (table) => {
        table.increments('id').primary();
        table.integer('match_id').unsigned();
        table.foreign('match_id').references('match.id');
        table.integer('odd_type_id').unsigned();
        table.foreign('odd_type_id').references('odd_type.id');
        table.timestamp('created_at');
      })
        .then(() => {
          console.log('Table match_odd_type was created.');
        })
        .catch((err) => {
          console.log(err);
        }),
      knex.schema.createTable('odd_v2', (table) => {
        table.increments('id').primary();
        table.integer('match_id').unsigned();
        table.foreign('match_id').references('match.id');
        table.integer('odd_type_id').unsigned();
        table.foreign('odd_type_id').references('odd_type.id');
        table.string('box_name').collate('utf8_general_ci');
        table.string('name').notNullable().collate('utf8_general_ci');
        table.string('opp_number');
        table.decimal('value').notNullable();
        table.timestamp('created_at');
      })
        .then(() => {
          console.log('Table odd_v2 was created.');
        })
        .catch((err) => {
          console.log(err);
        })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('odd_v2')
      .then(() => {
        console.log('Table odd_v2 was deleted.')
      })
      .catch((err) => {
        console.log(err);
      }),
    knex.schema.dropTable('match_odd_type')
      .then(() => {
        console.log('Table match_odd_type was deleted.')
      })
      .catch((err) => {
        console.log(err);
      }),
    knex.schema.dropTable('odd_type')
      .then(() => {
        console.log('Table odd_type was deleted.')
      })
      .catch((err) => {
        console.log(err);
      }),
  ])
}