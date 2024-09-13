require("dotenv").config();
const mysql = require('mysql2/promise');

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ingrain`;
const useDatabaseQuery = `USE ingrain`;
const createOrdersTableQuery = `
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  appartmentNumber VARCHAR(10),
  city VARCHAR(100) NOT NULL,
  country VARCHAR(20) NOT NULL,
  state VARCHAR(10) NOT NULL,
  zipCode VARCHAR(10) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

const createEventsTableQuery = `
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  nameOfPlace VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(255) NOT NULL,
  image MEDIUMBLOB,
  description VARCHAR(500),
  dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

async function initializeDatabase() {
  const connection = await connectionPool.getConnection();

  try {
    await connection.query(createDatabaseQuery);
    console.log("Database 'ingrain' checked/created.");

    await connection.query(useDatabaseQuery);
    console.log("Connected to 'ingrain' database.");

    await connection.query(createOrdersTableQuery);
    console.log("Order table checked/created.");

    await connection.query(createEventsTableQuery);
    console.log("Events table checked/created.");
  } catch (err) {
    console.error("Database initialization error:", err.message);
  } finally {
    connection.release();
  }
}

initializeDatabase();

module.exports = connectionPool;
