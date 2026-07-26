const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// In-memory database for mock mode
let users = [];

// Default mock users for testing
const defaultUsers = [
  {
    id: uuidv4(),
    firstName: 'Admin',
    lastName: 'AZULAN',
    email: 'admin@azulan.fr',
    password: '$2a$10$mockhashedpassword', // hashed 'admin123'
    role: 'admin',
    newsletter: false,
    createdAt: new Date(),
  },
];

users = [...defaultUsers];

class MockDataService {
  static async findUserByEmail(email) {
    return users.find(u => u.email === email);
  }

  static async createUser(userData) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = {
      id: uuidv4(),
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
    };

    users.push(newUser);
    return { ...newUser, password: undefined }; // Don't return password
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static getAllUsers() {
    return users.map(u => ({ ...u, password: undefined }));
  }

  static resetData() {
    users = [...defaultUsers];
  }
}

module.exports = MockDataService;
