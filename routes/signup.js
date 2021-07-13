const express = require("express");
const router = express.Router();

const { check, body, validationResult } = require("express-validator");

const User = require("../models/user");

router.get("/signup", (req, res, next) => {
  res.render("layouts/signup", { title: "Sign Up", style: "login.css" });
});

router.post(
  "/signup",
  [
    body("userName").custom((value) => {
      const duplicate = User.duplicateCheckUserName(value);
      if (duplicate) {
        throw new Error("Username already exsist");
      }
      return true;
    }),
    check("email", "Email invalid, example : name@example.com").isEmail(),
    body("email").custom((value) => {
      const duplicate = User.duplicateCheckEmail(value);
      if (duplicate) {
        throw new Error("Email already exsist");
      }
      return true;
    }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      res.render("layouts/signup", { title: "Sign Up", style: "login.css", errors: errors.array() });
    } else {
      const newUser = new User(req.body.firstName, req.body.lastName, req.body.userName, req.body.email, req.body.password);
      newUser.save();
      res.redirect("/login");
    }
  }
);

module.exports = router;
