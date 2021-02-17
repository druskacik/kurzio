const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Sport = require('./Sport');

const OddType = bookshelf.Model.extend({
  tableName: 'odd_type',
  idAttribute: 'id',
  sport: function () { return this.belongsTo(Sport); }
});

module.exports = bookshelf.model('OddType', OddType);