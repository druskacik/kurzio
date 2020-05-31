const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Timestamp = require('./Timestamp');

const Event = bookshelf.Model.extend({
  tableName: 'event',
  idAttribute: 'id',
  timestamps: function () { return this.hasMany(Timestamp) }
})

module.exports = Event;