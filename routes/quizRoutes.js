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
    res.redirect("/learning")
  })
 });

 router.post("/quiz2", (req, res) => {
  let answer = req.body.quiz2;
  let username = req.user.username;
  User.findOneAndUpdate(
    {username: username},
    {$set: {"quizAnswers.1": answer, "completedLessons.1":1}}
  )
  .then(()=>{
    res.redirect("/lessons/2")
  })
 });

 router.post("/quiz3", (req, res) => {
  let answer = req.body.quiz3;
  let username = req.user.username;
  User.findOneAndUpdate(
    {username: username},
    {$set: {"quizAnswers.2": answer, "completedLessons.2":1}}
  )
  .then(()=>{
    res.redirect("/lessons/3")
  })
 });

module.exports = router;