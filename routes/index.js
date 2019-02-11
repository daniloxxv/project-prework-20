const passport = require("passport");
const { Router } = require("express");
const router = Router();
const User = require("../Model/User");
const ensureLogin = require("connect-ensure-login")
//Section  Model
const Section = require("../Model/Section");

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.user;
  const data = { user: user };
  res.render("index", { data });
});

router.get("/lessons/:num", ensureLogin.ensureLoggedIn(),(req, res, next) => {
  const lessonNumber = req.params.num;
  const user = req.user; 

      var commentas = [];
      Section.find()
        .then(comments => {
          commentas = comments;
          //Foreach to pass the id of each section as string
          commentas.forEach(element => {
            element._id = element._id.toString();       
          });
          const data = {
            user: user,
            coment: commentas,
            lessonNumber: lessonNumber
          };
          res.render(`lessons/lesson${lessonNumber}` , { data });
        })
  });



router.get("/classmates",  ensureLogin.ensureLoggedIn(),(req, res, next) => {
  const user = req.user;
  const data = { user: user };
  res.render("classmates", { data });
});

router.get("/*", (req, res, next) => {
  res.render("error");
});
module.exports = router;
