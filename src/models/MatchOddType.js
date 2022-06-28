const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const MatchOddType = bookshelf.Model.extend({
    tableName: 'match_odd_type',
    idAttribute: 'id',
    match () {
        const Match = require('./Match');
        return this.belongsTo(Match);
    },
    oddType () {
        const OddType = require('./OddType');
        return this.belongsTo(OddType);
    },
});

module.exports = bookshelf.model('MatchOddType', MatchOddType);