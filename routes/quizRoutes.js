const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//Models
const User = require("../Model/User");


router.post("/quiz1", (req, res) => {
  let answer = req.body.quiz1; //TODO: SAVE IN DATABASE
  res.redirect("/learning")
 });

module.exports = router;