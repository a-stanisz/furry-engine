const db = require('../util/database');
// const fs = require('fs');
// const path = require('path');

const Cart = require('./cart');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = callback => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       callback([]);
//     } else {
//       callback(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.description, this.imageUrl]
    );
  };

  static deleteById(id) {
    
  }

  static fetchAll(callback) {
    return db.execute('SELECT * FROM products');
  };

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id=?', [id]);
  };
};