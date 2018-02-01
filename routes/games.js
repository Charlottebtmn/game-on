var express = require('express');
var router = express.Router();
const Game = require('../models/game');

router.get('/new', function (req, res, next) {
  res.render('games/new');
});

router.post('/new', function (req, res, next) {
  const newGame = new Game({
    title: req.body.title,
    description: req.body.description,
    _boardgame: req.body._id,
    adress: req.body.adress,
    time: req.body.time,
    nbplayers: req.body.players,
  });
  newGame.save((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect(`/`);
    }
  });
});

router.get('/games/:id', function (req, res, next) {
  let id = req.params.id;
  Game.findById(id, (err, game) => {
    if (err) {
      console.error(err);
    }
    res.render('games/view', {
        game,
      });
  });
});


module.exports = router;