const passport = require("passport");
const { Router } = require("express");
const router = Router();
const User = require("../Model/User");
//Section  Model
const Section = require("../Model/Section");

/* GET home page */
router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  const user = req.user;
  const data = { user: user };
  res.render("index", { data });
});

router.get("/classmates", (req, res, next) => {

  const user = req.user;
  const data = { user: user };
  res.render("classmates", { data });
});

 router.get("/*", (req, res, next) => {

  res.render("error");
});
module.exports = router;
