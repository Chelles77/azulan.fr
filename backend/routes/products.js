const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET tous les produits
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET un produit
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer un produit
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT modifier un produit
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE un produit
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
