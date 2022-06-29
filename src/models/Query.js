const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Query = bookshelf.Model.extend({
    tableName: 'query',
    idAttribute: 'id',
    user () {
        const User = require('./User');
        return this.belongsTo(User);
    },
})

module.exports = bookshelf.model('Query', Query);