const path = require('path');

const express = require('express');

const rootDir = require('../util/path')

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  res.render('add-product', { docTitle: 'Add Product', path: '/admin/add-product' });
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="sumbit">Add a product</button></form>');
});
  
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

// module.exports = router;
exports.router = router;
exports.products = products;
