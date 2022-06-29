
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('query', (table) => {
            table.increments('id').primary();
            table.string('query').notNullable().collate('utf8_general_ci');
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.boolean('active').defaultTo(true);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table query was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('query')
            .then(() => {
                console.log('Table query was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
