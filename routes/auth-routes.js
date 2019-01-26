const passport = require('passport');
const {Router} = require('express');
const router = Router();

const User = require('../models/User');

router
  .get('/signup', (req, res, next)=>{
    res.render('auth/signup');
  })
  .post('/signup', (req, res, next)=>{
    User.register( new User({ username: req.body.username }),
    req.body.password,
    function(err, account){
      if(err){
        return res.json(err);
      }
      return res.redirect('/login')
    });
  })
  .get('/login', (req, res, next)=>{
    return res.render('auth/login');
  })
  .post('/login', passport.authenticate('local'), (req, res, next)=>{
    return res.redirect('/');
  })
  .get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/login');
  })
  .get('/private', (req, res, next)=>{
    const user = req.user;
    if(user){
      return res.render('auth/private', {user: req.user});
    }
    return res.redirect("/login")
  })
  .get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/login');
  })

module.exports = router;