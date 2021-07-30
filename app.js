const path = require('path');

const express = require('express');

const app = express();
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61028df1b0f2b450ded338fb')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
  .connect(process.env.DB_CONN_STR)
  .then((result) => {
    console.log(result);
    app.listen(3000);
    console.log('Connected at port: 3000!');
  })
  .catch((err) => console.log(err));
