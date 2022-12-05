const pool = require('../db/db.js');

const readQuestions = (product_id, page, count) => {
  //var query = `SELECT * FROM questions WHERE product_id = ${product_id} LIMIT ${count} OFFSET ${(page - 1) * count}`;
  let query = `SELECT
    id AS question_id,
    body AS question_body,
    date_written AS question_date,
    asker_name,
    helpful AS question_helpfulness,
    reported,
    (SELECT
        COALESCE (json_object_agg(key, value), '{}')
      FROM
        (SELECT
          answers.id AS key,
          to_jsonb(answers) AS value
        FROM
          (SELECT
            answers.id AS id,
            answers.body,
            answers.date_written AS date,
            answers.answerer_name,
            answers.helpful AS helpfulness,
            (SELECT
              coalesce(array_agg(answers_photos.url), '{}')
            FROM (
              SELECT
                answers_photos.url
              FROM answers_photos
              WHERE answers_photos.answer_id = answers.id) AS answers_photos
            ) AS photos
          FROM answers
          WHERE answers.question_id = questions.id) AS answers
        ) AS answer_key_value_list
    ) AS answers
    FROM questions WHERE product_id = ${product_id}
    LIMIT ${count} OFFSET ${(page - 1) * count}`;

  return pool.query(query)
  .then((results) => {
    //console.log('results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with getting all questions', err))
}

const readAnswers = (question_id, page, count) => {
  var query = `SELECT
    id,
    body,
    date_written AS date,
    answerer_name,
    helpful AS helpfulness,
    reported,
    (SELECT
      COALESCE(json_agg(answers_photos), '[]')
    FROM
      (SELECT
        answers_photos.answer_id AS id,
        answers_photos.url
      FROM answers_photos
      WHERE answers_photos.answer_id = answers.id) AS answers_photos
    ) AS photos
  FROM answers WHERE question_id = ${question_id}
  LIMIT ${count} OFFSET ${(page - 1) * count}`;

  return pool.query(query)
  .then((result) => {
    //console.log('results in models', results)
    return result.rows;
  })
  .catch(err => console.log('Models: ERR with getting all answers', err))
}

const addQuestion = (product_id, body, asker_name, asker_email, reported, helpful, date_written) => {
  var query = `INSERT INTO questions (product_id, body, asker_name, asker_email, reported, helpful, date_written)
  VALUES (${product_id}, ${body}, ${asker_name}, ${asker_email}, ${reported}, ${helpful}, ${date_written})`;

  return pool
  .query(query)
  .then((results) => {
    //console.log('posting question results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with posting question', err))
}

const addAnswer = (answer) => {
  return pool.query(`INSERT INTO answers VALUES(nextval('answers_id_seq'), $1, $2, $3, $4, $5)`, answer)
    .catch(err => {
      console.error('add answer: ', err)
      throw err;
    });
}

const addAnswerWithPhotos = (answer, photos) => {
  return pool.query(`INSERT INTO answers VALUES(nextval('answers_id_seq'), $1, $2, $3, $4, $5) returning answer_id`, answer)
    .then((result) => {
      let id = result.rows[0].answer_id;
      return Promise.all(photos.map(photo => {
        return pool.query(`INSERT INTO answers_photos VALUES(nextval('answers_photos_id_seq'), '${photo}', ${id})`)
      }))
      .catch(err => {
        console.error('promise: ', err)
        throw err;
      });
    })
    .catch(err => {
      console.error('add answer with photo: ', err)
      throw err;
    });
}

const helpQuestion = (id) => {
  var query = `UPDATE questions SET helpful = helpful + 1 WHERE id = ${id}`;

  return pool
  .query(query)
  .then((results) => {
    console.log('results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with adding helpful to questions', err))
}

const helpAnswer = (id) => {
  var query = `UPDATE answers SET helpful = helpful + 1 WHERE id = ${id}`;

  return pool
  .query(query)
  .then((results) => {
    console.log('results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with adding helpful to answers', err))
}


const reportedQuestion = (id) => {
  var query = `UPDATE questions SET reported = 1 WHERE id = ${id}`;

  return pool
  .query(query)
  .then((results) => {
    console.log('results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with reporting question', err))
}


const reportedAnswer = (id) => {
  var query = `UPDATE answers SET reported = 1 WHERE id = ${id}`;

  return pool
  .query(query)
  .then((results) => {
    console.log('results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with reporting answer', err))
}

module.exports = {
  readQuestions,
  readAnswers,
  addQuestion,
  addAnswer,
  addAnswerWithPhotos,
  helpQuestion,
  helpAnswer,
  reportedQuestion,
  reportedAnswer
}