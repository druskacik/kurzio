const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Competition = require('./Competition');
const EmailNotification = require('./EmailNotification');

const Email = bookshelf.Model.extend({
  tableName: 'email',
  idAttribute: 'id',
  competitions: function () { return this.belongToMany(Competition).through(EmailNotification); },
});

module.exports = Email;