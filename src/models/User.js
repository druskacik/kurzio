const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const User = bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'id',
    sports () {
        const Sport = require('./Sport');
        const UserSportNotification = require('./UserSportNotification');
        return this.belongsToMany(Sport).through(UserSportNotification);
    },
    competitions () {
        const Competition = require('./Competition');
        const UserCompetitionNotification = require('./UserCompetitionNotification');
        return this.belongsToMany(Competition).through(UserCompetitionNotification);
    },
    matches () {
        const Match = require('./Match');
        const UserMatchNotification = require('./UserMatchNotification');
        return this.belongsToMany(Match).through(UserMatchNotification);
    },
});

module.exports = bookshelf.model('User', User);
