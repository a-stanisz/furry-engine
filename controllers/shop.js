const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'Shop Product List',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  res.render('shop/index', {
    // prods: products,
    docTitle: 'Shop Home Page',
    path: '/'
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    docTitle: 'Your Cart',
    path: '/cart'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    docTitle: 'Checkout',
    path: '/checkout'
  });
};