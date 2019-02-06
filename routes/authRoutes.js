const { Router } = require("express");
const router = Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
//Section  Model
const Section = require("../Model/Section");

router.get("/users/register", (req, res, next) => {
  res.render("auth/signup");
});

// @route   GET  /user/register
// @desc    Register User
// @access  Public
router.post("/users/registerNew", (req, res) => {
  //if the email exists already
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //Create new User
      const commentId = parseInt(Math.random() * (100000 - 1) + 1);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        avatarUrl: "",
        id: commentId,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.redirect("/users/login"))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.get("/users/login", (req, res, next) => {
  res.render("auth/login");
});

// @route   Post  /user/login
// @desc    Login user / Returnoing JWT token
// @access  Public
router.post("/users/loginNew", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find by email
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched

        //Create jwt payload
        const payload = {
          _id: user._id,
          username: user.username,
          avatarUrl: user.avatarUrl
        };
        //Sign the token
        jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
         
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

// @route   GET  /user/current
// @desc    Return the current user
// @access  Private
router.get(
  "/users/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user._id,
      name: req.user.username,
      email: req.user.email
    });
  }
);

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
module.exports = router;
