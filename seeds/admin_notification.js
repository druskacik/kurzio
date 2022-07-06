
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('admin_notification').del()
        .then(function () {
            // Inserts seed entries
            return knex('admin_notification').insert([
                {
                    type: 'REQUEST_ERROR',
                },
            ]);
        });
};
