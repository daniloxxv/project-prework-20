const passport = require("passport");
const { Router } = require("express");
const router = Router();
const User = require("../Model/User");
//Section  Model
const Section = require("../Model/Section");

router
  //authentication routes

  .get("/signup", (req, res, next) => {
    res.render("auth/signup");
  })
  .post("/signup", (req, res, next) => {
    //Regex validation for username
    if (!req.body.username) {
      let usernameError = "Usernames cannot be blank";
      res.render("auth/signup", { usernameError });
      return;
    }
    if (/[^a-z]/.test(req.body.username)) {
      let usernameError = "Only lowercase letters are alowed";
      res.render("auth/signup", { usernameError });
      return;
    }

    //Regex validation for password
    if (!req.body.password) {
      let passwordError = "Passwords cannot be blank";
      res.render("auth/signup", { passwordError });
      return;
    }
    if (/[^a-zA-Z0-9]/.test(req.body.password)) {
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
    if (!req.body.email) {
      let emailError = "The e-mail field cannot be blank.";
      res.render("auth/signup", { emailError });
      return;
    }
    //Regex validation for email (thanks to https://emailregex.com/

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        req.body.email
      )
    ) {
      let emailError = "Please introduce a valid e-mail address";
      res.render("auth/signup", { emailError });
      return;
    }

    //Passport authentication
    const commentId = parseInt(Math.random() * (100000 - 1) + 1);
    User.register(
      new User({ username: req.body.username, email: req.body.email,avatarUrl:"",id:commentId}),
      req.body.password,

      function(err, account) {
        if (err) {
          return res.json(err);
        }
        return res.redirect("/login");
      }
    );
  })
  .get("/login", (req, res, next) => {
    return res.render("auth/login");
  })
  .post("/login", passport.authenticate("local"), (req, res, next) => {
    return res.redirect("/");
  })
  .get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/login");
  })
  .get("/private", (req, res, next) => {
    const user = req.user;
    if (user) {
      return res.render("auth/private", { user: req.user });
    }
    return res.redirect("/login");
  })
  .get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/login");
  });

//end authentication routes
module.exports = router;