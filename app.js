const express = require("express");

const app = express();
const port = 3000;

const mainRoutes = require("./routes/main");
const loginRoutes = require("./routes/login");
const gameRoutes = require("./routes/game");
const signupRoutes = require("./routes/signup");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// method : get
app.use(mainRoutes);

// method : post & get
app.use(loginRoutes);

// method : post & get
app.use(signupRoutes);

// method : get
app.use(gameRoutes);

// 404 Page Not Found
app.use((req, res, next) => {
  const title = "Page Not Found";
  const style = "404.css";
  res.status(404).render("layouts/404", { title, style });
});

app.listen(port, () => {
  console.log(`You are currently listening on port = ${port}`);
});
