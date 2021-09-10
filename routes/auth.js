const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid e-mail')
      .normalizeEmail(),
    body('password', 'Password is wrong')
      .isLength({min: 5})
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin);
router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid e-mail')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('This e-mail is forbidden.');
        // }
        // return true;
        return User.findOne({ email: value })
        .then((userDoc) => {
          if (userDoc) {
            return Promise.reject('This e-mail already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password', 'Password needs to have at least 5 characters and be alphanumeric')
      .isLength({min: 5})
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(`Passwords don't match`)
        }
        return true;
      })
      .trim(),
  ],
  authController.postSignup);
router.post('/logout', authController.postLogout);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;
