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

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
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
          res.redirect("/");
        }
      });
    })
    .catch(error => {
      next(error);
    });
});

//Log in
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
  }),
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

module.exports = router;

// router
//   //authentication routes

//   .get("/signup", (req, res, next) => {
//     res.render("auth/signup");
//   })
//   .post("/signup", (req, res, next) => {
//     //Regex validation for username
//     if (!req.body.username) {
//       let usernameError = "Usernames cannot be blank";
//       res.render("auth/signup", { usernameError });
//       return;
//     }
//     if (/[^a-z]/.test(req.body.username)) {
//       let usernameError = "Only lowercase letters are alowed";
//       res.render("auth/signup", { usernameError });
//       return;
//     }

//     //Regex validation for password
//     if (!req.body.password) {
//       let passwordError = "Passwords cannot be blank";
//       res.render("auth/signup", { passwordError });
//       return;
//     }
//     if (/[^a-zA-Z0-9]/.test(req.body.password)) {
//       let passwordError = "Only letters and numbers are allowed.";
//       res.render("auth/signup", { passwordError });
//       return;
//     } else if (!/(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+/.test(req.body.password)) {
//       let passwordError =
//         "Please include at least one number and one capital letter.";
//       res.render("auth/signup", { passwordError });
//       return;
//     } else if (!/^[a-zA-Z0-9]{6,20}$/.test(req.body.password)) {
//       let passwordError =
//         "Your password should have between 6 and 20 characters.";
//       res.render("auth/signup", { passwordError });
//       return;
//     }

//     //Validation for email )
//     if (!req.body.email) {
//       let emailError = "The e-mail field cannot be blank.";
//       res.render("auth/signup", { emailError });
//       return;
//     }
//     //Regex validation for email (thanks to https://emailregex.com/

//     if (
//       !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//         req.body.email
//       )
//     ) {
//       let emailError = "Please introduce a valid e-mail address";
//       res.render("auth/signup", { emailError });
//       return;
//     }

//     //Passport authentication
//     const commentId = parseInt(Math.random() * (100000 - 1) + 1);
//     User.register(
//       new User({ username: req.body.username, email: req.body.email,avatarUrl:"",id:commentId}),
//       req.body.password,

//       function(err, account) {
//         if (err) {
//           return res.json(err);
//         }
//         return res.redirect("/login");
//       }
//     );
//   })
//   .get("/login", (req, res, next) => {
//     return res.render("auth/login");
//   })
//   .post("/login", passport.authenticate("local"), (req, res, next) => {
//     return res.redirect("/");
//   })
//   .get("/logout", (req, res, next) => {
//     req.logout();
//     res.redirect("/login");
//   })
//   .get("/private", (req, res, next) => {
//     const user = req.user;
//     if (user) {
//       return res.render("auth/private", { user: req.user });
//     }
//     return res.redirect("/login");
//   })
//   .get("/logout", (req, res, next) => {
//     req.logout();
//     res.redirect("/login");
//   });

//end authentication routes
// module.exports = router;
