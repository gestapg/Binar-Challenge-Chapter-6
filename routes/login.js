const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const User = require("../models/user");

router.get("/login", (req, res, next) => {
  const title = "Login";
  const style = "login.css";
  res.render("layouts/login", { title, style });
});

router.post(
  "/login",
  [
    body("userName").custom((value) => {
      const duplicate = User.duplicateCheckUserName(value);
      if (!duplicate) {
        throw new Error("Invalid Username, Please sign up first!");
      }
      return true;
    }),
    body("email").custom((value) => {
      const duplicate = User.duplicateCheckEmail(value);
      if (!duplicate) {
        throw new Error("Invalid Email, Please sign up first!");
      }
      return true;
    }),
    body("password").custom((value) => {
      const duplicate = User.duplicateCheckPassword(value);
      if (!duplicate) {
        throw new Error("Invalid Password");
      }
      return true;
    }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("layouts/login", { title: "Login", style: "login.css", errors: errors.array() });
    } else {
      res.redirect(`/game`);
    }
  }
);

module.exports = router;
