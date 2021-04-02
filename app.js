const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.router);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { docTitle: 'Page Not Found', path: '' });
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  // setTimeout(() => res.redirect('/'), 3000);
});

app.listen(3000);