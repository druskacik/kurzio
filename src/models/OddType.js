const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const OddType = bookshelf.Model.extend({
    tableName: 'odd_type',
    idAttribute: 'id',
    sport () {
        const Sport = require('./Sport');
        return this.belongsTo(Sport);
    },
    matches () {
        const Match = require('./Match');
        const MatchOddType = require('./MatchOddType');
        return this.belongsToMany(Match).through(MatchOddType);
    },
});

module.exports = bookshelf.model('OddType', OddType);