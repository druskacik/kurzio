const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Timestamp = require('./Timestamp');

const Odd = bookshelf.Model.extend({
  tableName: 'odd',
  idAttribute: 'id',
  timestamp: function () { return this.belongsTo(Timestamp) }
})

module.exports = Odd;