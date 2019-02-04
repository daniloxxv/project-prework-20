const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//Models
const Profile = require("../Model/Profile");
const User = require("../Model/User");

// @route   GET  /profile
// @desc    Get current user profile
// @access  Private
router.get("/profile", (req, res) => {
  console.log(req.user._id);
  Profile.findOne({ user: req.user._id })
    .then(profile => {
      if (!profile) {
        return res
          .status(404)
          .json({ msg: "There is no profile for this user" });
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST  /profile
// @desc    Create or edit user profile
// @access  Private
router.post("/profile", (req, res) => {
  //Get fields

  const profileFields = {};
  profileFields.user = req.user._id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.githubUsername)
    profileFields.githubUsername = req.body.githubUsername;
  //Skills - split into array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }

  //Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user._id }).then(profile => {
    if (profile) {
      //Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      //Create

      //Check if handle exists
      Profile.findOne({ handle: profile.handle }).then(profile => {
        if (profile) {
          res.status(400).json({ error: "That handle alrrady exists" });
        }
        //Save Profile
        new Profile(profileFields).save().then(profille => res.json(profile));
      });
    }
  });
});

//end authentication routes
module.exports = router;
