const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/users');

router.get('/dashboard', adminControllers.getAdminDashboard);

module.exports = router;
