const express = require('express');
const Product = require('../models/Product');
const MockProducts = require('../services/mockProducts');
const router = express.Router();

// GET tous les produits
router.get('/', async (req, res) => {
  try {
    let products = [];
    try {
      const dbProducts = await Product.findAll();
      products = dbProducts.map(p => p.toJSON());
    } catch (err) {
      console.log('DB error, using mock:', err.message);
      products = MockProducts.getAllProducts();
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET un produit
router.get('/:id', async (req, res) => {
  try {
    let product = null;
    try {
      product = await Product.findByPk(req.params.id);
    } catch (err) {
      console.log('DB error, using mock:', err.message);
      product = MockProducts.getProductById(req.params.id);
    }

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer un produit
router.post('/', async (req, res) => {
  try {
    let product = null;
    try {
      product = await Product.create(req.body);
      product = product.toJSON();
    } catch (err) {
      console.log('DB error, using mock:', err.message);
      product = MockProducts.createProduct(req.body);
    }
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT modifier un produit
router.put('/:id', async (req, res) => {
  try {
    let product = null;
    try {
      const dbProduct = await Product.findByPk(req.params.id);
      if (!dbProduct) {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }
      product = await dbProduct.update(req.body);
      product = product.toJSON();
    } catch (err) {
      console.log('DB error, using mock:', err.message);
      product = MockProducts.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE un produit
router.delete('/:id', async (req, res) => {
  try {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }
      await product.destroy();
    } catch (err) {
      console.log('DB error, using mock:', err.message);
      const deleted = MockProducts.deleteProduct(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }
    }
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
