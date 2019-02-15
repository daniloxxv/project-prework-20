require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

//Auth
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const flash = require("connect-flash");

var bcrypt;
try {
  bcrypt = require("bcrypt");
} catch (e) {
  bcrypt = require("bcryptjs");
}
const User = require("./Model/User");

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`,
);

const app = express();

// Middleware Setup
app.use(flash());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  }),
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//hbs helper
hbs.registerHelper("assign", (varName, varValue, options) => {
  if (!options.data.root) {
    options.data.root = {};
  }
  options.data.root[varName] = varValue;
});

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// // default value for title local
// app.locals.title = "Express - Generated with IronGenerator";

//Passport middleware
app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true,
  }),
);

//Passport Config
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }
      return next(null, user);
    });
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // get user from cookie, database, etc.
  const user = req.user;
  if (user) {
    app.locals.userName =
      user.username[0].toUpperCase() +
      user.username.slice(1, user.username.length);
    app.locals.avatar = user.avatarUrl;
  } else {
    app.locals.userName = "";
    app.locals.avatar = "";
  }
  next();
});

app.use((req, res, next) => {
  // get user from cookie, database, etc.
  if (req.user) {
    var progress =
      (req.user.completedLessons.filter(el => el > 0).length /
        req.user.completedLessons.length) *
      100;
    app.locals.progress = progress;
  } else {
    app.locals.progress = 0;
  }
  next();
});

app.use((req, res, next) => {
  // get user from cookie, database, etc.
  if (req.user) {
    var currentLesson = req.user.completedLessons.indexOf(0) + 1;
    app.locals.currentLesson = currentLesson;
  } else {
    app.locals.currentLesson = 1;
  }
  next();
});

app.use((req, res, next) => {
  // get user from cookie, database, etc.
  if (req.user) {
    var nextLesson =
      app.locals.currentLesson < 10 ? app.locals.currentLesson + 1 : false;
    app.locals.nextLesson = nextLesson;
  } else {
    app.locals.nextLesson = 1;
  }
  next();
});

//Routes
const quiz = require("./routes/quizRoutes");
app.use("/", quiz);
const auth = require("./routes/authRoutes");
app.use("/", auth);
const post = require("./routes/postRoutes");
app.use("/", post);
const profile = require("./routes/profileRoutes");
app.use("/", profile);
const router = require("./routes/index");
app.use("/", router);

module.exports = app;
