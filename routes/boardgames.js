var express = require('express');
var router = express.Router();
var bg = require('../data/bg.json');

router.get('/board-games', (req, res, next) => {
  res.render('boardgames/list', {
    bg,
  });
});

module.exports = router;