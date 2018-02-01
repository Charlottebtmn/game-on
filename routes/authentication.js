const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

router.get('/login', (req, res) => {
  res.render('authentication/login');
});

router.get('/signup', (req, res) => {
  res.render('authentication/signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup'
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
