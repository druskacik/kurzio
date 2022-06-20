const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Sport = bookshelf.Model.extend({
    tableName: 'sport',
    idAttribute: 'id',
    competitions () {
        const Competition = require('./Competition');
        return this.hasMany(Competition);
    },
});

module.exports = bookshelf.model('Sport', Sport);