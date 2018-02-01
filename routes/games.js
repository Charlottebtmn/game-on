var express = require('express');
var router = express.Router();
const Game = require('../models/game');

router.get('/new', function (req, res, next) {
  res.render('games/new');
});

module.exports = router;
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
    }
    else {
      res.redirect(`/`);
    }
  });
});

module.exports = router;
