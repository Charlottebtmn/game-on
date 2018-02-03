const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const User = require('../models/user');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


router.get('/profile', ensureLoggedIn(), (req, res) => {
  res.render('profile', {user: req.user});
});

router.post('/profile', ensureLoggedIn(), upload.single('photo'), function(req, res, next){
  User.findByIdAndUpdate(req.user._id, {
    username: req.body.username,
    description: req.body.description,
    //_boardGame: req.body._boardGame,
    type: req.body.type,
    imgUrl: '/uploads/'+req.file.filename
  },
  (err,user) => {
    if (err) {
      next(err);
    }
    else {
      res.redirect('/profile');
    }
  });
});

module.exports = router;
