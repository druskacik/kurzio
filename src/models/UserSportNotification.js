const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const UserSportNotification = bookshelf.Model.extend({
    tableName: 'user_sport_notification',
    idAttribute: 'id',
    sport () {
        const Sport = require('./Sport');
        return this.belongsTo(Sport);
    },
    user () {
        const User = require('./User');
        return this.belongsTo(User);
    },
});

module.exports = bookshelf.model('UserSportNotification', UserSportNotification);
