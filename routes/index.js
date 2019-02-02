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

/* GET home page */

router.get("/", (req, res, next) => {
  const user = req.user;
  console.log(user, req.user);
  res.render("index", { user });
});

router.get("/classmates", (req, res, next) => {
  const user = req.user;
  console.log(user, req.user);
  res.render("classmates", { user });
});

///////////////////////////////////////////////////////////////////////////////Side Comments Routes///////////////////////////////////////////////////////////////////////////////
router.get("/learning", (req, res, next) => {
  const user = req.user;
  if (user) {
    var commentas = [];
    Section.find()
      .then(comments => {
        commentas = comments;
        //Foreach to pass the id of each section as string
        commentas.forEach(element => {
          element._id = element._id.toString();
        });
      })
      .catch(err => {
        console.log(err);
      });

    User.findOne({
      email: user.email
    })
      .then(user => {
        const data = {
          userr: user,
          coment: commentas
        };
        //console.log("The data is:", data);
        res.render("learning", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

// @route   POST /comments
// @desc    Insert a new comment on existing section or creates a new Section with comment
// @access  Private
router.post("/comments", (req, res, next) => {
  //Get the request body
  const {
    authorAvatarUrl,
    authorId,
    authorName,
    authorUrl,
    comment,
    sectionId,
    id
  } = req.body;

  const data =  {
    authorAvatarUrl,
    authorId,
    authorName,
    authorUrl,
    comment,
    sectionId,
    id
  };

  //Here we create the new Comment object with the data of req.body
  const newComment = {
    authorAvatarUrl,
    authorName,
    authorId,
    authorUrl,
    comment,
    id,
    deleted: false,
    replies: []
  };

  //Query
  const query = {
      sectionId: sectionId
    },
    update = {
      $push: {
        comments: newComment
      }
    },
    options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    };

  //if the document is not found, then create a new one, else update comments and push the newComment
  Section.findOneAndUpdate(query, update, options)
    .then(comment => {
      res.redirect("/learning");
    })
    .catch(err => {
      console.log(err);
    });
});

// @route   POST /delete
// @desc    Marks the recievied comment id as deleted
// @access  Private
router.post("/delete", (req, res, next) => {
  const commentId = req.body.id;
  Section.update(
    { "comments.id": commentId },
    { $set: { "comments.$.deleted": true } }
  )
    .then(comment => {
      console.log(comment);
      res.redirect(200, "/learning");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
