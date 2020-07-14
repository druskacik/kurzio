const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Email = require('./Email');
const EmailNotification = require('./EmailNotification');

const Competition = bookshelf.Model.extend({
  tableName: 'competition',
  idAttribute: 'id',
  emails: function () { return this.belongsToMany(Email).through(EmailNotification); }
});

module.exports = bookshelf.model('Competition', Competition);