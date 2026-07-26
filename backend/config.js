const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://postgres:Azulan2024!@#Secure@db.qevttxsrdnyxpmaxexfd.supabase.co:5432/postgres',
  {
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
