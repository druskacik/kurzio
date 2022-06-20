const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Competition = bookshelf.Model.extend({
    tableName: 'competition',
    idAttribute: 'id',
    sport () {
        const Sport = require('./Sport');
        return this.belongsTo(Sport);
    },
    users () {
        const User = require('./User');
        const UserCompetitionNotification = require('./UserCompetitionNotification');
        return this.belongsToMany(User).through(UserCompetitionNotification);
    },
});

module.exports = bookshelf.model('Competition', Competition);