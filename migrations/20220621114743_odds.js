
exports.up = function(knex) {
    return Promise.all([
        // knex.schema.alterTable('competition', (table) => {
        //     table.timestamp('updated_at').defaultTo(knex.fn.now());
        // })
        //     .then(() => {
        //         console.log('Column updated_at was added to table competition.');
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     }),
        knex.schema.createTable('odd_type', (table) => {
            table.increments('id').primary();
            table.string('provider_id').notNullable();
            table.string('label').collate('utf8_general_ci');
            table.string('path');
            table.integer('sport_id').unsigned();
            table.foreign('sport_id').references('sport.id');
            table.timestamp('created_at').defaultTo(knex.fn.now());
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
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table match_odd_type was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('user_match_notification', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.integer('match_id').unsigned();
            table.foreign('match_id').references('match.id');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table user_match_notification was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        // knex.schema.createTable('odd', (table) => {
        //     table.increments('id').primary();
        //     table.string('label');
        //     table.string('type');
        //     table.float('odd', 8, 2); // 8 digits max, 2 decimal places max
        //     table.integer('provider_id');
        //     table.integer('match_id').unsigned();
        //     table.foreign('match_id').references('match.id');
        //     table.integer('odd_type_id').unsigned();
        //     table.foreign('odd_type_id').references('odd_type.id');
        //     table.timestamp('created_at').defaultTo(knex.fn.now());
        // })
        //     .then(() => {
        //         console.log('Table odd was created.');
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     }),
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('user_match_notification')
            .then(() => {
                console.log('Table user_match_notification was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('match_odd_type')
            .then(() => {
                console.log('Table match_odd_type was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('odd_type')
            .then(() => {
                console.log('Table odd_type was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        // knex.schema.dropTable('odd')
        //     .then(() => {
        //         console.log('Table odd was deleted.');
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     }),
        // knex.schema.alterTable('competition', (table) => {
        //     table.dropColumn('updated_at');
        // })
        //     .then(() => {
        //         console.log('Column updated_at was dropped from table competition.');
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     }),
    ]);
};
