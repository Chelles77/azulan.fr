const { Sequelize } = require('sequelize');
require('dotenv').config();

// PostgreSQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'azulan',
  process.env.DB_USER || 'azulan',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
