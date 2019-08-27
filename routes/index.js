const express = require('express');
const passport = require('passport');
const bcyrpt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const exec = require('child_process').exec;
const Users = require('../passport/user.js')

const router = express.Router();
const bcryptSettings = {
  saltRounds: 10
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/videos'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/status',
  failureRedirect: '/status'
}));
router.get('/signout', (req, res) => {
  req.logout();
  res.json({ 'status': true });
});
router.post('/signup', (req, res) => {
  if ((!req.body['id'] || !req.body['pw']) || !req.body['username']) {
    res.json({ 'status': false, 'message': 'Authenticated failed' });
  }
  else {
    bcyrpt.hash(req.body['pw'], bcryptSettings.saltRounds, (err, hash) => {
      Users.signUp(req.body['id'], hash, req.body['username']);
    });
    res.json({ 'status': true });
  }
});
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 'status': true, 'id': req.user['id'] });
  }
  else {
    res.json({ 'status': false, 'message': 'Authenticated failed' });
  }
});
router.post('/upload', upload.single('video'), (req, res) => {
  if (req.isAuthenticated()) {
    Users.addVideo(req.file.originalname, req.user['id']);
    let str = 'ffmpeg -i public/videos/' + req.file.originalname + ' -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls public/videos/' + req.file.originalname.split('.')[0] + '.m3u8';
    exec(str, (error, stdout, stderr) => {
      if (error) console.log(error);
      console.log(stdout);
      console.log(stderr);
      res.json({ 'status': true });
    });
  }
  else {
    res.json({ 'status': false, 'message': 'Authentication failed' });
  }
});
router.get('/video', (req, res) => {
  Users.getVideos().then((results) => {
    res.json({ 'status': true, 'videos': results });
  });
});

module.exports = router;
