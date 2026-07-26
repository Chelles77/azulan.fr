const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  products: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  total: DataTypes.FLOAT,
  status: {
    type: DataTypes.STRING,
    enum: ['pending', 'paid', 'shipped', 'delivered'],
    defaultValue: 'pending',
  },
  stripePaymentId: DataTypes.STRING,
  shippingAddress: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
});

module.exports = Order;
