
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('admin_notification', (table) => {
            table.increments('id').primary();
            table.string('type').notNullable();
            table.boolean('locked').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table admin_notification was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('admin_notification')
            .then(() => {
                console.log('Table admin_notification was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
