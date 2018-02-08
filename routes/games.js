var express = require('express');
var router = express.Router();
const Game = require('../models/game');
const User = require('../models/user');
var bg = require('../data/bg.json');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.get('/new', function (req, res, next) {
  Game.find((err, games) => {
    if (err) {
      console.error(err);
    }
    res.render('games/new', {
      games: games,
      bg: bg
    });
  });
});

router.post('/new', ensureLoggedIn(), function (req, res, next) {
  const newGame = new Game({
    title: req.body.title,
    description: req.body.description,
    boardgame: req.body.boardgame,
    coordinates: [req.body.lat, req.body.lng],
    adress: req.body.adress,
    time: req.body.time,
    nbplayers: req.body.players,
    _creator: req.user._id,
  });
  newGame.save((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  });
});

router.get('/games/:id', function (req, res, next) {
  let id = req.params.id;
  Game.findById(id)
    .populate("_creator")
    .populate("_players")
    .then(game => {
      for (let i = 0; i < bg.length; i++) {
        if (game.boardgame === bg[i].title) {
          var bginfos = bg[i];
        }
      }
      res.render('games/view', {
        game,
        bginfos
      });

    })
    .catch(error => {
      console.error(error);
    })
});

router.post('/games/:id/register', ensureLoggedIn(), function (req, res, next) { // req.user._id
  let id = req.params.id;
  let playerId = req.user._id;
  Game.findByIdAndUpdate(id, {
      $push: { // Mongo oriented
        _players: req.user._id,
      }
    }),
    User.findByIdAndUpdate(playerId, {
      $push: {
        _games: id
      }
    }, (err, game) => { // callback
      if (err) {
        console.error(err);
      }
      res.redirect('/');
    });
});

module.exports = router;