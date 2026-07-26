const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
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
  res.json({ status: 'Backend AZULAN is running (TEST MODE)!' });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Start MongoDB In-Memory Server
let mongoServer;

async function startServer() {
  try {
    // Lancer MongoDB in-memory
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    console.log('✅ MongoDB In-Memory Server démarré');

    // Connecter mongoose
    await mongoose.connect(mongoUri);
    console.log('✅ Mongoose connecté à MongoDB in-memory');

    // Démarrer le serveur Express
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Serveur lancé sur http://localhost:${PORT} (MODE TEST)`);
      console.log('💾 Tous les données sont en mémoire - seront effacées à l\'arrêt');
    });
  } catch (err) {
    console.error('❌ Erreur de démarrage:', err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Arrêt du serveur...');
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
  process.exit(0);
});

startServer();

module.exports = app;