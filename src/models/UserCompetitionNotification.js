const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const UserCompetitionNotification = bookshelf.Model.extend({
    tableName: 'user_competition_notification',
    idAttribute: 'id',
    Competition () {
        const Competition = require('./Competition');
        return this.belongsTo(Competition);
    },
    user () {
        const User = require('./User');
        return this.belongsTo(User);
    },
});

module.exports = bookshelf.model('UserCompetitionNotification', UserCompetitionNotification);
