// const User = require('../models/user');
const { check, body, validationResult, Result } = require('express-validator');
const { sequelize, User, Biodata } = require('../models');

////////// USER SIGN UP //////////////
exports.getUserSignUp = (req, res, next) => {
  res.render('layouts/signup', { title: 'Sign Up', style: 'login.css' });
};

exports.userValidationSignUp = [
  body('userName').custom(async value => {
    const duplicate = await User.findOne({ where: { userName: value } });
    if (duplicate) {
      throw new Error('Username already exsist');
    }
    return true;
  }),
  check('email', 'Email invalid, example : name@example.com').isEmail(),
  body('email').custom(async value => {
    const duplicate = await User.findOne({ where: { email: value } });
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
    const { userName, email, password } = req.body;
    User.create({ userName, email, password })
      .then(result => {
        const id = result.dataValues.id;
        res.redirect(`/biodata/${id}`);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

////////// USER LOGIN ////////////
exports.getUserLogin = (req, res, next) => {
  const title = 'Login';
  const style = 'login.css';
  res.render('layouts/login', { title, style });
};

exports.userValidationLogin = body('userName').custom(
  async (value, { req }) => {
    const user = await User.findOne({ where: { userName: value } });
    if (!user) {
      throw new Error('Invalid Username, Please sign up first!');
    } else if (user.password !== req.body.password) {
      throw new Error('Wrong password!!');
    } else {
      return true;
    }
  }
);

exports.postUserLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('layouts/login', {
      title: 'Login',
      style: 'login.css',
      errors: errors.array(),
    });
  }
  const userName = req.body.userName;
  User.findOne({ where: { userName } })
    .then(user => {
      res.redirect(`/game/${user.id}`);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getUserBiodataInput = (req, res, next) => {
  const title = 'Fill in Biodata';
  const style = 'login.css';
  const userId = req.params.id;
  res.render('layouts/biodata', { title, style, userId });
};

exports.postUserBiodataInput = async (req, res, next) => {
  const { firstName, lastName, nationality, tribe, userId } = req.body;
  Biodata.create({
    firstName,
    lastName,
    nationality,
    tribe,
    userId,
  })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
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
