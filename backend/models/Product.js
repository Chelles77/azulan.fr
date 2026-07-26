const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categorie: DataTypes.STRING,
  marque: DataTypes.STRING,
  modele: DataTypes.STRING,
  garantie: DataTypes.STRING,
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  prixOriginal: DataTypes.FLOAT,
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  description: DataTypes.TEXT,
  annonce: DataTypes.TEXT,
  images: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
});

module.exports = Product;
