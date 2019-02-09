const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//Models
const User = require("../Model/User");


router.post("/quiz1", (req, res) => {
  let answer = req.body.quiz1;
  let username = req.user.username;
  //TODO: SAVE IN DATABASE
  User.findOneAndUpdate(
    {username: username},
    {$set: {"quizAnswers.0": answer, "completedLessons.0":1}}
  )
  .then(()=>{
    let successMessage = "<span class = 'alert-success'>You have completed the lesson</span>"
    res.redirect("/learning")
  })
  

 });

module.exports = router;