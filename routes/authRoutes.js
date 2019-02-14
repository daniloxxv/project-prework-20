// routes/auth-routes.js
const { Router } = require("express");
const router = Router();
const express = require("express");
// User model
const User = require("../Model/User");
// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

// @route   GET  /signup
// @desc    Render the register form
// @access  Public
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// @route   POST  /signup
// @desc    Register new User
// @access  Public
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!req.body.username) {
    let usernameError = "Usernames cannot be blank";
    res.render("auth/signup", { usernameError });
    return;
  }

  if (/[^a-z0-9]/.test(username)) {
    let usernameError =
      "Usernames can only contain lowercase letters and numbers";
    res.render("auth/signup", { usernameError });
    return;
  }

  //   Regex validation for password
  else if (!req.body.password) {
    let passwordError = "Passwords cannot be blank";
    res.render("auth/signup", { passwordError });
    return;
  } else if (/[^a-zA-Z0-9]/.test(req.body.password)) {
    let passwordError = "Only letters and numbers are allowed.";
    res.render("auth/signup", { passwordError });
    return;
  } else if (!/(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+/.test(req.body.password)) {
    let passwordError =
      "Please include at least one number and one capital letter.";
    res.render("auth/signup", { passwordError });
    return;
  } else if (!/^[a-zA-Z0-9]{6,20}$/.test(req.body.password)) {
    let passwordError =
      "Your password should have between 6 and 20 characters.";
    res.render("auth/signup", { passwordError });
    return;
  }

  //Validation for email )
  else if (!req.body.email) {
    let emailError = "The e-mail field cannot be blank.";
    res.render("auth/signup", { emailError });
    return;
  }
  //Regex validation for email (thanks to https://emailregex.com/
  else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      req.body.email,
    )
  ) {
    let emailError = "Please introduce a valid e-mail address";
    res.render("auth/signup", { emailError });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("auth/signup", { message: "The username already exists" });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const commentId = parseInt(Math.random() * (100000 - 1) + 1);
      const newUser = new User({
        username,
        password: hashPass,
        email: req.body.email,
        avatarUrl: "",
        id: commentId,
      });

      newUser.save(err => {
        if (err) {
          res.render("auth/signup", { message: "Something went wrong" });
        } else {
          res.redirect("/login");
        }
      });
    })
    .catch(error => {
      next(error);
    });
});

// @route   GET  /login
// @desc    login with credentials
// @access  Public
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

// @route   POST  /login
// @desc    Authenticate the user, so he can access private routes
// @access  Public
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
  }),
);

// @route   GET  /logout
// @desc    Ends user Session
// @access  Public
router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    res.redirect("/login"); //Inside a callback… bulletproof!
  });
});

module.exports = router;
