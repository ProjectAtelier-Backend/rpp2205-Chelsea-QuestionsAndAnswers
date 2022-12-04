const axios = require('axios')
const request = require('supertest');
const express = require('express');
const moxios = require('moxios');
require("dotenv").config();

describe('All questions', (done) => {
  test('It should return 200 for all questions GET request', async () => {
    moxios.stubRequest(`http://localhost:${process.env.PORT}/qa/questions`, {
      status: 200
    })
  })
})

describe('All answers', (done) => {
  test('It should return 200 for product ID 71717 answers GET request', async () => {
    moxios.stubRequest(`http://localhost:${process.env.PORT}/qa/questions/71717/answers`, {
      status: 200
    })
  })
})

describe('Post Question', (done) => {
  test('It should return 200 when posting a question', async () => {
    moxios.stubRequest(`http://localhost:${process.env.PORT}/qa/questions`, {
      status: 200
    })
  })
})

describe('Post Answer', (done) => {
  test('It should return 200 when posting an answer', async () => {
    moxios.stubRequest(`http://localhost:${process.env.PORT}/qa/questions/71717/answers`, {
      status: 200
    })
  })
})

describe('Put Question as helpful', (done) => {
  test('It should return 200 when marking a question as helpful', async () => {
    moxios.stubRequest(`http://localhost:${process.env.PORT}/qa/questions/600/helpful`, {
      status: 200
    })
  })
})

describe('Put Answer as helpful', (done) => {
  test('It should return 200 when marking annswer as helpful', async () => {
    moxios.stubRequest(`http://localhost:${process.env.PORT}/qa/answers/600/helpful`, {
      status: 200
    })
  })
})

describe('Put Question to report', (done) => {
  test('It should return 200 when reporting a question', async () => {
    moxios.stubRequest(`http://localhost:${process.env.PORT}/qa/questions/600/report`, {
      status: 200
    })
  })
})

describe('Put Answer to report', (done) => {
  test('It should return 200 when reporting an answer', async () => {
    moxios.stubRequest(`http://localhost:${process.env.PORT}/qa/answers/600/report`, {
      status: 200
    })
  })
})

// function sum(a, b) {
//   return a + b;
// }

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

