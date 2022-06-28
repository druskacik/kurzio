const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Match = bookshelf.Model.extend({
    tableName: 'match',
    idAttribute: 'id',
    competition () {
        const Competition = require('./Competition');
        return this.belongsTo(Competition);
    },
    oddTypes () {
        const OddType = require('./OddType');
        const MatchOddType = require('./MatchOddType');
        return this.hasMany(OddType).throgh(MatchOddType);
    },
    users () {
        const User = require('./User');
        const UserMatchNotification = require('./UserMatchNotification');
        return this.belongsToMany(User).through(UserMatchNotification);
    },
});

module.exports = bookshelf.model('Match', Match);