const connection = require('../../knex_connection');
const bookshelf = require('bookshelf')(connection);

const Course = bookshelf.Model.extend({
  tableName: 'courses',
  idAttribute: 'id',
})

module.exports = Course;