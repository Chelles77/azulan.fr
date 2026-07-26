const { v4: uuidv4 } = require('uuid');

// In-memory product database
let products = [
  {
    id: uuidv4(),
    nom: 'Aspirateur Robot',
    categorie: 'Aspirateurs',
    prix: 299.99,
    stock: 15,
    description: 'Aspirateur robot intelligent avec navigation laser',
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    nom: 'Lave-Vaisselle Encastrable',
    categorie: 'Electromenager',
    prix: 599.99,
    stock: 8,
    description: 'Lave-vaisselle silencieux, classe énergétique A++',
    createdAt: new Date(),
  },
];

class MockProductsService {
  static getAllProducts() {
    return [...products];
  }

  static getProductById(id) {
    return products.find(p => p.id === id);
  }

  static createProduct(data) {
    const newProduct = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
    };
    products.push(newProduct);
    return newProduct;
  }

  static updateProduct(id, data) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...data };
    return products[index];
  }

  static deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;

    products.splice(index, 1);
    return true;
  }

  static resetData() {
    products = [
      {
        id: uuidv4(),
        nom: 'Aspirateur Robot',
        categorie: 'Aspirateurs',
        prix: 299.99,
        stock: 15,
        description: 'Aspirateur robot intelligent avec navigation laser',
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        nom: 'Lave-Vaisselle Encastrable',
        categorie: 'Electromenager',
        prix: 599.99,
        stock: 8,
        description: 'Lave-vaisselle silencieux, classe énergétique A++',
        createdAt: new Date(),
      },
    ];
  }
}

module.exports = MockProductsService;
