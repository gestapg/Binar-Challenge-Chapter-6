const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game');

router.get('/game/:id', gameController.getGame);

module.exports = router;
