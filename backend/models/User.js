const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  phone: String,
  password: { type: String, required: true },
  newsletter: { type: Boolean, default: false },
  role: { type: String, enum: ['client', 'admin', 'collaborator'], default: 'client' },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
