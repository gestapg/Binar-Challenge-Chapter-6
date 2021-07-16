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

exports.postGameScore = (req, res, next) => {
  const score = req.body.score;
  const id = req.body.id;
  console.log(score);
  res.redirect(`/game/${id}`);
};

exports.getMainPage = (req, res, next) => {
  const title = 'Home';
  const style = 'main.css';
  res.render('layouts/main', {
    title,
    style,
  });
};
