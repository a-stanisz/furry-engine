const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1];
  // console.log(isLoggedIn);
  // console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Log in',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
  User.findById('6132363a7a0dbc4311b89359')
  .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};
