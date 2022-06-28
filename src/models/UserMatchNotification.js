const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const UserMatchNotification = bookshelf.Model.extend({
    tableName: 'user_match_notification',
    idAttribute: 'id',
    sport () {
        const Match = require('./Match');
        return this.belongsTo(Match);
    },
    user () {
        const User = require('./User');
        return this.belongsTo(User);
    },
});

module.exports = bookshelf.model('UserMatchNotification', UserMatchNotification);
