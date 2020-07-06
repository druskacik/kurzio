const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Email = require('./Email');
const Sport = require('./Sport');

const EmailSportNotification = bookshelf.Model.extend({
  tableName: 'email_sport_notification',
  idAttribute: 'id',
  sport: function () { return this.belongsTo(Sport); },
  email: function () { return this.belongsTo(Email); },
});

module.exports = EmailSportNotification;