require("dotenv").config();
const { Pool } = require('pg');
//const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

module.exports = pool;