// const User = require('../models/user');
const { check, body, validationResult, Result } = require('express-validator');
const { sequelize, User, Biodata } = require('../models');

////////// USER SIGN UP //////////////
exports.getUserSignUp = (req, res, next) => {
  res.render('layouts/signup', { title: 'Sign Up', style: 'login.css' });
};

// exports.userValidationSignUp = [
//   body('userName').custom(value => {
//     const duplicate = User.duplicateCheckUserName(value);
//     if (duplicate) {
//       throw new Error('Username already exsist');
//     }
//     return true;
//   }),
//   check('email', 'Email invalid, example : name@example.com').isEmail(),
//   body('email').custom(value => {
//     const duplicate = User.duplicateCheckEmail(value);
//     if (duplicate) {
//       throw new Error('Email already exsist');
//     }
//     return true;
//   }),
// ];

exports.postUserSignUp = (req, res, next) => {
  const { userName, email, password } = req.body;
  User.create({ userName, email, password })
    .then(result => {
      const id = result.dataValues.id;
      res.redirect(`/biodata/${id}`);
    })
    .catch(err => {
      console.log(err);
    });

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.render('layouts/signup', {
  //     title: 'Sign Up',
  //     style: 'login.css',
  //     errors: errors.array(),
  //   });
  // } else {
  //   const newUser = new User(
  //     req.body.firstName,
  //     req.body.lastName,
  //     req.body.userName,
  //     req.body.email,
  //     req.body.password
  //   );
  //   newUser.save();
  //   res.redirect('/login');
  // }
};

////////// USER LOGIN ////////////
exports.getUserLogin = (req, res, next) => {
  const title = 'Login';
  const style = 'login.css';
  res.render('layouts/login', { title, style });
};

exports.postUserLogin = (req, res, next) => {
  const userName = req.body.userName;
  User.findOne({ where: { userName } })
    .then(user => {
      res.redirect(`/game/${user.id}`);
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.userValidationLogin = body('userName').custom((value, { req }) => {
//   const user = User.duplicateCheckUserName(value);
//   if (user.email === req.body.email && user.password === req.body.password) {
//     return true;
//   } else if (user.email !== req.body.email) {
//     throw new Error('Invalid email!');
//   } else if (user.password !== req.body.password) {
//     throw new Error('Wrong password!!');
//   } else if (user.userName !== req.body.userName) {
//     throw new Error('Invalid Username, Please sign up first!');
//   }
// });

// exports.postUserLogin = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     res.render('layouts/login', {
//       title: 'Login',
//       style: 'login.css',
//       errors: errors.array(),
//     });
//   }
//   const user = User.duplicateCheckUserName(req.body.userName);
//   res.redirect(`/game/${user.id}?user=${user.userName}`);
// };

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
