var express = require('express');
var router = express.Router();
const game = require('../models/game');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/', (req, res, next) => {
  Game
    .find({})
    .populate('_creator')
    .exec((err, campaigns) => {
      res.render('index', { games });
    });
});

module.exports = router;
