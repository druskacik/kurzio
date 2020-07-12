const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Email = require('./Email');
const EmailSportNotification = require('./EmailSportNotification');
const Competition = require('./Competition');

const Sport = bookshelf.Model.extend({
  tableName: 'sport',
  idAttribute: 'id',
  emails: function () { return this.belongsToMany(Email).through(EmailSportNotification); },
  competitions: function () { return this.hasMany(Competition) }
});

module.exports = Sport;