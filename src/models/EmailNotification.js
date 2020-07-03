const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Email = require('./Email');
const Competition = require('./Competition');

const EmailNotification = bookshelf.Model.extend({
  tableName: 'email_notification',
  idAttribute: 'id',
  competition: function () { return this.belongsTo(Competition); },
  email: function () { return this.belongsTo(Email); },
});

module.exports = EmailNotification;