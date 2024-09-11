require("dotenv").config();
const mysql = require('mysql2');

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ingrain`;

// Create database if it doesn't exist
connectionPool.query(createDatabaseQuery, (err, result) => {
  if (err) {
    console.log("Error creating database:", err.message);
  } else {
    if (result.warningStatus === 0) {
      console.log("Database 'ingrain' created and connected.");
    } else {
      console.log("Database 'ingrain' already exists. Connection established.");
    }
  }
});

module.exports = connectionPool.promise();
