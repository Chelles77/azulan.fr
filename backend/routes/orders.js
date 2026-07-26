const express = require('express');
const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// GET toutes les commandes
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer une commande
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer un paiement Stripe
router.post('/payment', async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'eur',
      metadata: { orderId }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT confirmer le paiement
router.put('/:id/confirm-payment', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'paid', stripePaymentId: req.body.paymentId },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
