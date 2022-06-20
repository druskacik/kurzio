
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('sport', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable().collate('utf8_general_ci');
            table.integer('provider_id');
            table.string('url').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table sport was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('competition', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable().collate('utf8_general_ci');
            table.string('name_abbr').collate('utf8_general_ci');
            table.integer('provider_id');
            table.string('subsport').collate('utf8_general_ci');
            table.integer('sport_id').unsigned();
            table.foreign('sport_id').references('sport.id');
            table.string('url').notNullable();
            table.boolean('active').defaultTo(true);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table competition was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('match', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable().collate('utf8_general_ci');
            table.string('name_full').collate('utf8_general_ci');
            table.integer('provider_id');
            table.integer('competition_id').unsigned();
            table.foreign('competition_id').references('competition.id');
            table.string('url').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table match was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('user', (table) => {
            table.increments('id').primary();
            table.string('telegram_chat_id');
            table.boolean('active').defaultTo(true);
            table.string('token').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table user was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('user_sport_notification', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.integer('sport_id').unsigned();
            table.foreign('sport_id').references('sport.id');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table user_sport_notification was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('user_competition_notification', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.integer('competition_id').unsigned();
            table.foreign('competition_id').references('competition.id');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table user_competition_notification was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('message', (table) => {
            table.increments('id').primary();
            table.string('chat_id');
            table.string('message');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table message was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
      ])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('message')
            .then(() => {
                console.log('Table message was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('user_competition_notification')
            .then(() => {
                console.log('Table user_competition_notification was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('user_sport_notification')
            .then(() => {
                console.log('Table user_sport_notification was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('user')
            .then(() => {
                console.log('Table user was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('match')
            .then(() => {
                console.log('Table match was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('competition')
            .then(() => {
                console.log('Table competition was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('sport')
            .then(() => {
                console.log('Table sport was deleted.');
            })
            .catch((err) => {
                console.log(err);
            })
        ])
};
