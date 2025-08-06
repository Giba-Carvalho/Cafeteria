// backend/src/database/config/config.js
require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'pass',
    database: process.env.DB_NAME || 'cafeteria',
    host: process.env.DB_HOST || 'db',
    dialect: 'postgres'
  }
};
