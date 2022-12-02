
const { readQuestions, readAnswers, addQuestion } = require('./models.js');

const getQuestions = (req, res) => {
  //console.log('HERE!!', req)
  var page = req.query.page || 1;
  var count = req.query.count || 5;
  var product_id = req.params.question_id || 1;

  readQuestions(product_id, page, count)
    .then((results) => {
      //console.log('results from controllers readQuestions', results)
      res.send(results)
    })
    .catch(err => {
      res.status(500).send({
        message: "Controllers readQuestions Error.", err
      });
    });
}

const getAnswers = (req, res) => {
  //console.log('GET ANSWERS HERE!!', req)
  var page = req.query.page || 1;
  var count = req.query.count || 5;
  var question_id = req.params.question_id || 1;

  readAnswers(question_id, page, count)
    .then((results) => {
      //console.log('results from controllers readAnswers', results)
      res.send(results)
    })
    .catch(err => {
      res.status(500).send({
        message: "Controllers readAnswers Error.", err
      });
    });
}

const postQuestion = (req, res) => {
  console.log('POST A QUESTION HERE!!', req.query)
  var product_id = req.query.product_id || 1;
  var body = req.query.body
  var asker_name = req.query.asker_name
  var asker_email = req.query.asker_email
  var reported = 0;
  var helpful = 0;
  var date_written = Date.now()

  addQuestion(product_id, body, asker_name, asker_email, reported, helpful, date_written)
    .then((results) => {
      console.log('date writtennnn', date_written)
      console.log('results from controllers addQuestion', results)
      res.send(results)
    })
    .catch(err => {
      res.status(500).send({
        message: "Controllers addQuestion Error.", err
      });
    });
}

module.exports = {
  getQuestions,
  getAnswers,
  postQuestion
}