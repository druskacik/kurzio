const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Timestamp = require('./Timestamp');
const Odd = require('./Odd');

const Event = bookshelf.Model.extend({
  tableName: 'event',
  idAttribute: 'id',
  timestamps: function () { return this.hasMany(Timestamp) },
  odds: function () { return this.hasMany(Odd).through(Timestamp) }
})

module.exports = Event;