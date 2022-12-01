
const { readQuestions } = require('./models.js');

const getQuestions = (req, res) => {
  console.log('HERE!!', req.query)
  var page = req.query.page || 1;
  var count = req.query.count || 5;

  readQuestions(page, count)
    .then((results) => {
      console.log('results from controllers readQuestions', results)
      res.send(results)
    })
    .catch(err => console.log('readQuestions Error!', err))
}

module.exports = {
  getQuestions
}