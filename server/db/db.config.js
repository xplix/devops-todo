//jshint esversion: 6
var mysql = require('mysql');

//For a local MYSQL Connection
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cruddatabase'
});
dbConnection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConnection;