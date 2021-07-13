const express = require("express");
const router = express.Router();

router.get("/game", (req, res, next) => {
  const title = "Game";
  const style = "game.css";
  res.render("layouts/game", {
    title,
    style,
  });
});

module.exports = router;
