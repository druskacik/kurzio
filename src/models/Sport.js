const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Sport = bookshelf.Model.extend({
    tableName: 'sport',
    idAttribute: 'id',
    competitions () {
        const Competition = require('./Competition');
        return this.hasMany(Competition);
    },
    users () {
        const User = require('./User');
        const UserSportNotification = require('./UserSportNotification');
        return this.belongsToMany(User).through(UserSportNotification);
    },
});

module.exports = bookshelf.model('Sport', Sport);