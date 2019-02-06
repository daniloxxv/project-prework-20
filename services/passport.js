// //Passport js

// const mongoose = require("mongoose");
// const User = mongoose.model("User");

// passport.serializeUser((user, cb) => {
//   cb(null, user._id);
// });

// passport.deserializeUser((id, cb) => {
//   User.findById(id, (err, user) => {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, user);
//   });
// });

// passport.use(
//   new LocalStrategy((username, password, next) => {
//     User.findOne({ username }, (err, user) => {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         return next(null, false, { message: "Incorrect username" });
//       }
//       if (!bcrypt.compareSync(password, user.password)) {
//         return next(null, false, { message: "Incorrect password" });
//       }

//       return next(null, user);
//     });
//   }),
// );

// // const opts = {};
// // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// // opts.secretOrKey = "secret";

// // module.exports = passport => {
// //   passport.use(
// //     new JwtStrategy(opts, (jwt_payload, done) => {
// //       User.findById(jwt_payload._id)
// //         .then(user => {
// //           if (user) {
// //             return done(null, user);
// //           }
// //           return done(null, false);
// //         })
// //         .catch(err => console.log(err));
// //     }),
// //   );
// //};

// // const passport = require('passport')y
// // const localStrategy = require('passport-local').Strategy
// // const User = require('../Model/User')
// // passport.use(User.createStrategy());
// // passport.serializeUser(User.serializeUser());
// // passport.deserializeUser(User.deserializeUser());
// // module.exports = passport
