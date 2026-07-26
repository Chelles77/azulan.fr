const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  categorie: String,
  marque: String,
  modele: String,
  garantie: String,
  prix: { type: Number, required: true },
  prixOriginal: Number,
  stock: { type: Number, default: 0 },
  description: String,
  annonce: String,
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
