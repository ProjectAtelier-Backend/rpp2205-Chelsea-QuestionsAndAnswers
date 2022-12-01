const pool = require('../db/db.js');

const readQuestions = (page, count) => {
  var query = `SELECT * FROM questions LIMIT ${count} OFFSET ${(page - 1) * count}`;

  return pool
  .query(query)
  .then((results) => {
    return results.rows
  })
  .catch(err => console.log('Models: error with getting all questions', err))
}

module.exports = {
  readQuestions
}