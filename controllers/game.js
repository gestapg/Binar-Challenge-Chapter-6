exports.getGame = (req, res, next) => {
  const title = 'Game';
  const style = 'game.css';
  res.render('layouts/game', {
    title,
    style,
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
