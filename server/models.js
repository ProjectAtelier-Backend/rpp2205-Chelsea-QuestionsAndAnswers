const pool = require('../db/db.js');

const readQuestions = (product_id, page, count) => {
  var query = `SELECT * FROM questions WHERE product_id = ${product_id} LIMIT ${count} OFFSET ${(page - 1) * count}`;

  return pool
  .query(query)
  .then((results) => {
    console.log('results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with getting all questions', err))
}

const readAnswers = (question_id, page, count) => {
  var query = `SELECT * FROM answers WHERE question_id = ${question_id} LIMIT ${count} OFFSET ${(page - 1) * count}`;

  return pool
  .query(query)
  .then((results) => {
    //console.log('results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with getting all answers', err))
}

const addQuestion = (product_id, body, asker_name, asker_email, reported, helpful, date_written) => {
  var query = `INSERT INTO questions (product_id, body, asker_name, asker_email, reported, helpful, date_written) VALUES (${product_id}, ${body}, ${asker_name}, ${asker_email}, ${reported}, ${helpful}, ${date_written})`;

  return pool
  .query(query)
  .then((results) => {
    console.log('posting question results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with posting question', err))
}

module.exports = {
  readQuestions,
  readAnswers,
  addQuestion
}