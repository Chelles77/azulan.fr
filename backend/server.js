const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend AZULAN is running!' });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Base de données
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ MongoDB erreur:', err));

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});

module.exports = app;
