const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const ensureLogin = require("connect-ensure-login");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const index = require('./routes/index');
const users = require('./routes/users');
const authRoutes = require('./routes/authentication.js');
const games = require('./routes/games.js');

const User = require('./models/user');


mongoose.connect('mongodb://localhost/game-on');

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

app.use('/', index);
app.use('/users', users);
app.use('/', authRoutes);
app.use('/', games);



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