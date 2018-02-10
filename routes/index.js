var express = require('express');
var router = express.Router();
const Game = require('../models/game');

/* GET home page. */
router.get('/', (req, res, next) => {
  Game
    .find({})
    .populate('_creator')
    .exec((err, games) => {
      res.render('index', {
        games,
      });
    });
});

module.exports = router;