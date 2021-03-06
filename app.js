const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
// const ensureLogin = require("connect-ensure-login");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const multer  = require('multer');

require("dotenv").config();

// looking for boardgames
var where = require("lodash.where");

// algolia
// var algoliasearch = require('algoliasearch');
// var client = algoliasearch('6ZF6OOM1VX', 'd9cd76444afed525edcfab99270ca3a1');
// var index = client.initIndex('your_index_name');


const index = require('./routes/index');
const profile = require('./routes/profile');
const authRoutes = require('./routes/authentication.js');
const games = require('./routes/games.js');
const boardgames = require('./routes/boardgames.js')
const User = require('./models/user');


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/game-on");

var app = express();

//setting up routes

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Setting up Layouts
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'gameondev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
  (req, email, password, next) => {
    console.log("bug 1");
    // To avoid race conditions
    process.nextTick(() => {
      User.findOne({
        email
      }, (err, user) => {
        if (err) {
          return next(err);
        }

        if (user) {
          return next(null, false);
        } else {
          console.log("CA A BUGUE");
          // Destructure the body
          const {
            username,
            email,
            description,
            password,
            imgUrl,
            _boardGame,
            type
          } = req.body;
          const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
          const newUser = new User({
            email,
            username,
            password: hashPass,
            description,
            imgUrl,
            _boardGame,
            type,
          });

          newUser.save((err) => {
            if (err) {
              next(err);
            }
            return next(null, newUser);
          });
        }
      });
    });
  }));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
}, (email, password, next) => {
  User.findOne({
    email
  }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, {
        message: "Incorrect email"
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, {
        message: "Incorrect password"
      });
    }

    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("My First Middleware", req.user);
  if (typeof (req.user) !== "undefined") {
    res.locals.userSignedIn = true;
  } else {
    res.locals.userSignedIn = false;
  }
  next();
});

// app.use((req, res, next) => {
//   if (typeof (req.user) !== "undefined" {
//     res.locals.msg = {

//     }
//   }
//   next();
// });

app.use('/', index);
app.use('/', authRoutes);
app.use('/', games);
app.use('/', profile);
app.use('/', boardgames);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
