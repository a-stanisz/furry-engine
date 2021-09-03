exports.getLogin = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render('auth/login', {
        path: '/login',
        pageTitle: 'Log in',
      });
    })
    .catch((err) => console.log(err));
};
