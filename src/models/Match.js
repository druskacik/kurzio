const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Match = bookshelf.Model.extend({
    tableName: 'match',
    idAttribute: 'id',
    competition () {
        const Competition = require('./Competition');
        return this.belongsTo(Competition);
    }
});

module.exports = bookshelf.model('Match', Match);