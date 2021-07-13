const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/user');

router.get('/login', (req, res, next) => {
  const title = 'Login';
  const style = 'login.css';
  res.render('layouts/login', { title, style });
});

router.post(
  '/login',
  body('userName').custom((value, { req }) => {
    const user = User.duplicateCheckUserName(value);
    if (user.email === req.body.email && user.password === req.body.password) {
      return true;
    } else if (user.email !== req.body.email) {
      throw new Error('Invalid email!');
    } else if (user.password !== req.body.password) {
      throw new Error('Wrong password!!');
    } else if (user.userName !== req.body.userName) {
      throw new Error('Invalid Username, Please sign up first!');
    }
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('layouts/login', {
        title: 'Login',
        style: 'login.css',
        errors: errors.array(),
      });
    }
    const user = User.duplicateCheckUserName(req.body.userName);
    res.redirect(`/game/${user.id}?user=${user.userName}`);
  }
);

module.exports = router;
