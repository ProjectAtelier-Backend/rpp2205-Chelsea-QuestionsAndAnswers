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

// function sum(a, b) {
//   return a + b;
// }

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

