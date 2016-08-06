const mysql = require('mysql');
const error = require('chalk').white.bgRed.bold;

if(!process.env.MYSQL_PASSWORD) {
  throw error('Missing environment variable: MYSQL_PASSWORD')
}

const connection = mysql.createConnection({
  host: 'localhost',   
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'msgdb'
});

connection.connect();

module.exports = connection;