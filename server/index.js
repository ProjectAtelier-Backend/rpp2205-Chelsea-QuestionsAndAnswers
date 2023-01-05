const express = require('express')
const bodyParser = require("body-parser");
const app = express();
const port = 8001;
const { getQuestions, getAnswers, postQuestion, postAnswer, helpfulQuestion, helpfulAnswer, reportQuestion, reportAnswer } = require('./controllers.js');

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/loaderio-94e4bf78b10710b8b1f2253ff905f775', (req, res) => {
  res.send('loaderio-94e4bf78b10710b8b1f2253ff905f775');
})

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

// get questions
app.get('/qa/questions/:question_id', getQuestions);

// get answers
app.get('/qa/questions/:question_id/answers', getAnswers);

// post question
app.post('/qa/questions', postQuestion);

// post answer
app.post('/qa/questions/:question_id/answers', postAnswer);

// put question as helpful
app.put('/qa/questions/:question_id/helpful', helpfulQuestion);

// put question to report
app.put('/qa/questions/:question_id/report', reportQuestion);

// put answer as helpful
app.put('/qa/answers/:answer_id/helpful', helpfulAnswer);

// put answer to report
app.put('/qa/answers/:answer_id/report', reportAnswer)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})