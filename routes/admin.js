const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/dashboard', (req, res, next) => {
  User.fetchAllData(users => {
    res.render('layouts/dashboard', {
      title: 'Dashboard',
      style: 'dashboard.css',
      users,
    });
  });
});

module.exports = router;
