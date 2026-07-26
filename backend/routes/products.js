const express = require('express');
const Product = require('../models/Product');
const MockProducts = require('../services/mockProducts');
const router = express.Router();

// GET tous les produits
router.get('/', async (req, res) => {
  try {
    const dbProducts = await Product.findAll();
    const products = dbProducts.map(p => p.toJSON());
    res.json(products);
  } catch (err) {
    console.error('❌ DB error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET un produit
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json(product.toJSON());
  } catch (err) {
    console.error('❌ Fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST créer un produit
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product.toJSON());
  } catch (err) {
    console.error('❌ Create error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT modifier un produit
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    await product.update(req.body);
    res.json(product.toJSON());
  } catch (err) {
    console.error('❌ Update error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE un produit
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    await product.destroy();
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    console.error('❌ Delete error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
