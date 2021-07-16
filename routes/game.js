const express = require('express');
const router = express.Router();

const gameController = require('../controllers/game');

router.get('/game/:id', gameController.getGame);

router.post('/game/:id', gameController.postGameScore);

module.exports = router;
