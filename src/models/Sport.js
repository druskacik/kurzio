const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Email = require('./Email');
const EmailSportNotification = require('./EmailSportNotification');

const Sport = bookshelf.Model.extend({
  tableName: 'sport',
  idAttribute: 'id',
  emails: function () { return this.belongsToMany(Email).through(EmailSportNotification); }
});

module.exports = Sport;