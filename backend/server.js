const express = require('express');
const cors = require('cors');
const sequelize = require('./config');
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

// PostgreSQL Connection
sequelize.authenticate()
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch(err => console.error('❌ PostgreSQL error:', err.message));

// Sync database models
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ Sync error:', err.message));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = app;
