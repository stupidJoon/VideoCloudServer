const mysql = require('mysql');
const bcyrpt = require('bcrypt');

var exports = module.exports = {};

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'video_cloud',
  password: 'video_cloud',
  database: 'video_cloud'
});

module.exports.findId = (id, cb) => {
  pool.query('SELECT id FROM user WHERE id=?', [id], (error, results, fields) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (!results[0]) {
      cb(null, false);
      return;
    }
    const length = Object.keys(results[0]).length;
    if (length == 1) {
      cb(null, true)
    }
    else {
      cb(null, false)
    }
  });
};
module.exports.findPw = (id, pw, cb) => {
  pool.query('SELECT * FROM user WHERE id=?', [id], (error, results, fields) => {
    if (error) cb(error, null);
    const user = results[0];
    bcyrpt.compare(pw, user['pw'], (err, same) => {
      if (same == true) {
        cb(true, user);
      }
      else {
        cb(false, null);
      }
    });
  });
};
module.exports.signUp = (id, pw, username) => {
  pool.query('INSERT INTO user VALUES (?, ?, ?)', [id, pw, username], (error, results, fields) => {
    if (error) throw error;
  });
};
module.exports.idCheck = (id, cb) => {
  pool.query('SELECT id FROM user WHERE id=?', [id], (error, results, fields) => {
    if (error) throw error;
    const length = results.length;
    if (length == 1) {
      return cb(true);
    }
    else {
      return cb(false);
    }
  });
}
module.exports.getVideos = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM videos', (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });
}
module.exports.addVideo = (name, user) => {
  pool.query('INSERT INTO videos VALUES (?, ?)', [name, user], (error, results, fields) => {
    if (error) throw error;
  });
}