exports.get404Page = (req, res, next) => {
  const title = 'Page Not Found';
  const style = '404.css';
  res.status(404).render('layouts/404', { title, style });
};
