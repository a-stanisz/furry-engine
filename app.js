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
  User.findById('6130b8bf2a22e038600a3ddf')
    .then((user) => {
      req.user = user;
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
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Adam',
          email: 'adam@example.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
    console.log('Connected at port: 3000!');
  })
  .catch((err) => console.log(err));
