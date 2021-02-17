const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Competition = require('./Competition');

const Match = bookshelf.Model.extend({
  tableName: 'match',
  idAttribute: 'id',
  competition: function () { return this.belongsTo(Competition) }
});

module.exports = bookshelf.model('Match', Match);