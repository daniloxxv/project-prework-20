const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const User = require('../Model/User')

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport