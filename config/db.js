const mysql = require('mysql');

const connection = mysql.createConnection(process.env.JAWSDB_URL || {
  host: 'localhost',   
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'msgdb'
});

connection.connect();

module.exports = connection;