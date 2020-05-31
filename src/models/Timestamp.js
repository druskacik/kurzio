const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Event = require('./Event');
const Odd = require('./Odd');

const Timestamp = bookshelf.Model.extend({
  tableName: 'fetch_timestamp',
  idAttribute: 'id',
  event: function () { return this.belongsTo(Event) },
  odds: function () { return this.hasMany(Odd) },
});

module.exports = Timestamp;