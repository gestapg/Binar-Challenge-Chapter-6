const { sequelize, User, Biodata, Game } = require('../models');

exports.getGame = (req, res, next) => {
  const title = 'Game';
  const style = 'game.css';
  const id = req.params.id;
  res.render('layouts/game', {
    title,
    style,
    id,
  });
};

exports.getGameScore = (req, res, next) => {
  const userId = req.params.id;
  Game.findAll({ where: { userId: userId } })
    .then(games => {
      res.render('layouts/score', {
        title: 'Score',
        style: '',
        games,
        userId,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postGameScore = (req, res, next) => {
  const { userId, score } = req.body;
  Game.create({ userId, score })
    .then(games => {
      const userId = games.userId;
      res.redirect(`/game/score/${userId}`);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getMainPage = (req, res, next) => {
  const title = 'Home';
  const style = 'main.css';
  res.render('layouts/main', {
    title,
    style,
  });
};
