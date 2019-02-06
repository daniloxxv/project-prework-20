const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//Models
const Profile = require("../Model/Profile");
const User = require("../Model/User");

//Test Route
router.get("/profile/test", (req, res) => {
  return res.json({ msg: req.body });
});

// @route   GET  /profile
// @desc    Get current user profile
// @access  Private
router.get("/profile", (req, res) => {
  const user = req.user;
  if (user === undefined) {
    return res.render("auth/login");
  }
  Profile.findOne({ user: req.user._id })
    .populate("user", ["username", "avatarUrl"])
    .then(profile => {
      if (!profile) {
        res.render("profile/newProfile", { user });
      }
      res.render("profile/profile", { profile });
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET  /profile/all
// @desc    Get all profiles
// @access  Private
router.get("/profile/all", (req, res) => {
  const user = req.user;
  if (user === undefined) {
    return res.render("auth/login");
  }

  Profile.find()
    .populate("user", ["username", "avatarUrl"])
    .then(profiles => {
      if (!profiles) {
        return res.status(404).json({ msg: "The are no profiles" });
      }
      res.render("profile/classmates", { profiles });
      //res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ msg: "There are no profiles" });
    });
});

// @route   GET  /profile/handle/:handle
// @desc    Get profile by handle
// @access  Private
router.get("/profile/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["username", "avatarUrl"])
    .then(profile => {
      if (!profile) {
        res.status(404).json({ msg: "There is no profile for this user" });
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET  /profile/user/:user_id
// @desc    Get profile by user Id
// @access  Private
router.get("/profile/user/:user_id", (req, res) => {
  const user = req.user;

  if (user === undefined) {
    return res.render("auth/login");
  }

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["username", "avatarUrl"])
    .then(profile => {
      if (!profile) {
        res.status(404).json(errors);
      }
      res.render("profile/editProfile", { profile });
    })
    .catch(err =>
      res.status(404).json({ msg: "There is no profile for this user" }),
    );
});

// @route   GET  /profile/user/:user_id
// @desc    Get profile by user Id
// @access  Private
router.get("/profile/user/classmate/:user_id", (req, res) => {
  const user = req.user;

  if (user === undefined) {
    return res.render("auth/login");
  }

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["username", "avatarUrl"])
    .then(profile => {
      if (!profile) {
        res.status(404).json(errors);
      }
      res.render("profile/classmateProfile", { profile });
    })
    .catch(err =>
      res.status(404).json({ msg: "There is no profile for this user" }),
    );
});

// @route   POST  /profile
// @desc    Create or edit user profile
// @access  Private
router.post("/profile", (req, res) => {
  //Get fields

  const user = req.user;
  if (user === undefined) {
    return res.render("auth/login");
  }

  const profileFields = {};
  profileFields.user = req.user._id;

  if (!req.body.handle) {
    res.status(400).json({ err: "handle is required" });
  }

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

  Profile.findOne({ user: req.user._id })
    .then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: profileFields },
          { new: true },
        )
          .then(profile => {
            res.redirect("profile");
          })
          .catch(err => console.log(err));
      } else {
        //Create

        //Check if handle exists
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if (profile) {
              res.status(400).json({ error: "That handle alrrady exists" });
            }
            //Save Profile
            new Profile(profileFields).save().then(profile => {
              res.redirect("profile");
            });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

//end authentication routes
module.exports = router;
