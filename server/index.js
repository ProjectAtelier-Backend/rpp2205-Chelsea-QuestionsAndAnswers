const express = require('express')
const app = express()
const port = 3000
const db = require('../db/db.js');

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

// get questions
app.get('/qa/questions', (req, res) => {
})

// get answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
});

// post question
app.post('/qa/questions', (req, res) => {
})

// post answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
})

// put question as helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
})

// put question to report
app.put('/qa/questions/:question_id/report', (req, res) => {
})

// put answer as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
})

// put answer to report
app.put('/qa/answers/:answer_id/report', (req, res) => {
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})