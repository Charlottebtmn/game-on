const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const upload = multer({
  dest: './public/uploads/'
});
const User = require('../models/user');
const Game = require('../models/game');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


router.get('/profile', ensureLoggedIn(), function (req, res, next) {
  let id = req.user._id;
  User.findById(id)
    .populate("_games")
    .populate("_gamesCreated")
    .then(user => {
      res.render('profile', {
        user
      });
    })
    .catch(error => {
      console.error(error);
    });
});

router.post('/profile', ensureLoggedIn(), upload.single('photo'), function (req, res, next) {
  User.findByIdAndUpdate(req.user._id, {
      username: req.body.username,
      description: req.body.description,
      boardGame: req.body.boardGame,
      type: req.body.type,
      imgUrl: '/uploads/' + req.file.filename
    },
    (err, user) => {
      if (err) {
        next(err);
      } else {
        res.redirect('/profile');
      }
    });
});

module.exports = router;
