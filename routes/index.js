const express = require('express');
const passport = require('passport');
const bcyrpt = require('bcrypt');
const Users = require('../passport/user.js')

const router = express.Router();
const bcryptSettings = {
  saltRounds: 10
};

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/status',
  failureRedirect: '/status'
}));

router.get('/signout', (req, res) => {
  req.logout();
  res.json({'status': true});
});

router.post('/signup', (req, res) => {
  if ((!req.body['id'] || !req.body['pw']) || !req.body['username']) {
    res.json({'status': false, 'message': 'Authenticated failed'});
  }
  else {
    bcyrpt.hash(req.body['pw'], bcryptSettings.saltRounds, (err, hash) => {
      Users.signUp(req.body['id'], hash, req.body['username']);
    });
    res.json({'status': true});
  }
});

router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({'status': true, 'id': req.user['id']});
  }
  else {
    res.json({'status': false, 'message': 'Authenticated failed'});
  }
});

module.exports = router;
