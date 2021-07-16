const User = require('../models/user');
const { check, body, validationResult } = require('express-validator');

////////// USER SIGN UP //////////////
exports.getUserSignUp = (req, res, next) => {
  res.render('layouts/signup', { title: 'Sign Up', style: 'login.css' });
};

exports.userValidationSignUp = [
  body('userName').custom(value => {
    const duplicate = User.duplicateCheckUserName(value);
    if (duplicate) {
      throw new Error('Username already exsist');
    }
    return true;
  }),
  check('email', 'Email invalid, example : name@example.com').isEmail(),
  body('email').custom(value => {
    const duplicate = User.duplicateCheckEmail(value);
    if (duplicate) {
      throw new Error('Email already exsist');
    }
    return true;
  }),
];

exports.postUserSignUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('layouts/signup', {
      title: 'Sign Up',
      style: 'login.css',
      errors: errors.array(),
    });
  } else {
    const newUser = new User(
      req.body.firstName,
      req.body.lastName,
      req.body.userName,
      req.body.email,
      req.body.password
    );
    newUser.save();
    res.redirect('/login');
  }
};

////////// USER LOGIN ////////////
exports.getUserLogin = (req, res, next) => {
  const title = 'Login';
  const style = 'login.css';
  res.render('layouts/login', { title, style });
};

exports.userValidationLogin = body('userName').custom((value, { req }) => {
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
});

exports.postUserLogin = (req, res, next) => {
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
};

exports.getAdminDashboard = (req, res, next) => {
  User.fetchAllData(users => {
    res.render('layouts/dashboard', {
      title: 'Dashboard',
      style: 'dashboard.css',
      users,
    });
  });
};
