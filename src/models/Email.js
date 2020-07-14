const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Email = bookshelf.Model.extend({
  tableName: 'email',
  idAttribute: 'id',
});

module.exports = bookshelf.model('Email', Email);