const passport = require('passport')
const passportLocalMongoose =require('passport-local-mongoose');
const localStrategy = require('passport-local').Strategy

const User = require('../Model/User')

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport