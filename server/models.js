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
    console.log('results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with getting all questions', err))
}

const readAnswers = (question_id, page, count) => {
  //var query = `SELECT * FROM answers WHERE id = ${question_id} LIMIT ${count} OFFSET ${(page - 1) * count}`;
  //selects URLs & adds them into an array and places them into the right answers_ID (answers_photos)
  // var query = `SELECT
  // answer_id,
  // body,
  // date,
  // answerer_name,
  // helpfulness,
  // (SELECT
  //   COALESCE(json_agg(photo_list), '[]')
  // FROM
  //   (SELECT
  //     photos.photo_id AS id,
  //     photos.url
  //   FROM photos
  //   WHERE photos.answer_id = answers.answer_id) AS photo_list
  // ) AS photos
  // FROM answers WHERE question_id = ${question_id}
  // LIMIT ${answers.count} OFFSET ${(page - 1) * count}`;

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


  // var query = `SELECT
  //       a.question_id AS id,
  //       a.body,
  //       a.date_written AS date,
  //       a.answerer_name,
  //       a.helpful AS helpfulness,
  //       a.reported,
  //       ( SELECT COALESCE(json_agg(eachPhoto), '[]')
  //         FROM (
  //           SELECT
  //           p.id,
  //           p.url
  //           FROM answers_photos p
  //           WHERE p.answer_id = a.id
  //         ) eachPhoto
  //       ) AS photos
  //       FROM answers a
  //       WHERE a.question_id = q.id
  //     ) eachAnswer
  //   ) AS answers
  //   FROM answers WHERE question_id = ${question_id}
  //   LIMIT ${count} OFFSET ${(page - 1) * count}`;

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
    console.log('posting question results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with posting question', err))
}

const addAnswer = (question_id, body, answerer_name, answerer_email, reported, helpful, date_written) => {
  var query = `INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
  VALUES (${question_id}, ${body}, ${date_written}, ${answerer_name}, ${answerer_email}, ${reported}, ${helpful})`;

  return pool
  .query(query)
  .then((results) => {
    console.log('posting answer results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with posting answer', err))
}


const addAnswerWithPhoto = (question_id, body, answerer_name, answerer_email, reported, helpful, date_written) => {
  var query = `INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
  VALUES (${question_id}, ${body}, ${date_written}, ${answerer_name}, ${answerer_email}, ${reported}, ${helpful})
  INSERT INTO answers_photos (answer_id, url) VALUES (${answer_id}, ${url})`;

  return pool
  .query(query)
  .then((results) => {
    console.log('posting answer WITH photos results in models', results)
    return results.rows
  })
  .catch(err => console.log('Models: ERR with posting answer WITH photos', err))
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
  addAnswerWithPhoto,
  helpQuestion,
  helpAnswer,
  reportedQuestion,
  reportedAnswer
}