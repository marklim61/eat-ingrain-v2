const { Client } = require('square');
const client = new Client({
  environment: 'sandbox', // or 'production'
  accessToken: process.env.SQUARE_ACCESS_TOKEN, // Ensure you have your access token in environment variables
});

module.exports = client;
