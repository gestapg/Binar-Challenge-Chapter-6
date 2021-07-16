const express = require('express');

const app = express();
const port = 3000;

const errorController = require('./controllers/404');

const mainRoutes = require('./routes/main');
const loginRoutes = require('./routes/login');
const gameRoutes = require('./routes/game');
const signupRoutes = require('./routes/signup');
const dashboardRoutes = require('./routes/admin');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// method : get
app.use(mainRoutes);

// method : post & get
app.use(loginRoutes);

// method : post & get
app.use(signupRoutes);

app.use('/admin', dashboardRoutes);

// method : get
app.use(gameRoutes);

// 404 Page Not Found
app.use(errorController.get404Page);

app.listen(port, () => {
  console.log(`You are currently listening on port = ${port}`);
});
