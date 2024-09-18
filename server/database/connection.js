require("dotenv").config();
const mysql = require('mysql2/promise');

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 20, // Maximum number of connections
  queueLimit: 0, // Unlimited queue for waiting requests
  waitForConnections: true, // Wait for a connection if none are available
});

// console.log("Database Config:", {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });


module.exports = connectionPool;
