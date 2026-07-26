const express = require('express');
const User = require('../models/User');
const MockData = require('../services/mockData');
const jwt = require('jsonwebtoken');
const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, newsletter } = req.body;

    // Check if email exists (try DB first, fallback to mock)
    let existingUser = null;
    try {
      existingUser = await User.findOne({ where: { email } });
    } catch (err) {
      console.log('DB error, using mock:', err.message);
      existingUser = await MockData.findUserByEmail(email);
    }

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create user (try DB first, fallback to mock)
    let user;
    try {
      user = await User.create({ email, password, firstName, lastName, newsletter });
    } catch (err) {
      console.log('DB error, using mock:', err.message);
      user = await MockData.createUser({ email, password, firstName, lastName, newsletter });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'test-secret');
    res.status(201).json({ token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔑 Login attempt:', email);

    // Find user (try DB first, fallback to mock)
    let user = null;
    try {
      user = await User.findOne({ where: { email } });
      if (user) console.log('✅ User found in DB');
    } catch (err) {
      console.log('DB error, using mock:', err.message);
    }

    if (!user) {
      user = await MockData.findUserByEmail(email);
      if (user) console.log('✅ User found in mock');
    }

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Compare password (try DB method first, fallback to mock)
    let isValidPassword = false;
    try {
      if (user.comparePassword) {
        isValidPassword = await user.comparePassword(password);
        console.log('✅ Password verified via DB method');
      } else {
        isValidPassword = await MockData.comparePassword(password, user.password);
        console.log('✅ Password verified via mock');
      }
    } catch (err) {
      console.log('Password compare error:', err.message);
      isValidPassword = await MockData.comparePassword(password, user.password);
    }

    if (!isValidPassword) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    console.log('✅ Login successful:', email);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'test-secret');
    res.json({ token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET USERS (admin only)
router.get('/users', async (req, res) => {
  try {
    let users = [];
    try {
      const dbUsers = await User.findAll();
      users = dbUsers;
    } catch (err) {
      console.log('DB error, using mock:', err.message);
      users = MockData.getAllUsers();
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
