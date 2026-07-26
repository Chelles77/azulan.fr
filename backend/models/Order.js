const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    productId: mongoose.Schema.Types.ObjectId,
    nom: String,
    prix: Number,
    quantite: Number
  }],
  total: Number,
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered'], default: 'pending' },
  stripePaymentId: String,
  shippingAddress: {
    nom: String,
    adresse: String,
    codePostal: String,
    ville: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
