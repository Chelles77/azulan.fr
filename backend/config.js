const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://azulan_db_user:I0SENFJlaMgH7xFIhZFpIFU7eVCGLk4v@dpg-d9ie69naqgkc739v4hmg-a/azulan_db',
  {
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
