const db = require("./index");

module.exports = {
  activityList:(options, callback) => {
    var sql = `SELECT a.activity_name, a.activity_imgs, a.activity_id, a.isactive, b.club_name FROM club_activity a LEFT JOIN clubs b ON a.club_id = b.club_id;`;
    db.connect(sql, options, callback);
  },
  clubActivity:(options, callback) => {
    var sql = `SELECT a.activity_name, a.activity_imgs, a.activity_id, a.isactive, b.club_name FROM club_activity a LEFT JOIN clubs b ON a.club_id = b.club_id WHERE a.club_id = ?;`;
    db.connect(sql, options, callback);
  },
  activityDetail:(options, callback) => {
    var sql = `SELECT a.*, b.club_name, c.user_id FROM (club_activity a LEFT JOIN clubs b ON a.club_id = b.club_id) LEFT JOIN (SELECT * FROM user_activity WHERE user_id = ?) c ON a.activity_id = c.activity_id WHERE a.activity_id = ?;`;
    db.connect(sql, options, callback);
  },
  joinActivity:(options, callback) => {
    var sql = `INSERT INTO user_activity(user_id, activity_id) VALUE (?, ?);`;
    db.connect(sql, options, callback);
  },
  getBanner:(options, callback) => {
    var sql = `SELECT activity_id, activity_imgs FROM club_activity WHERE ishot = 1;`;
    db.connect(sql, options, callback);
  }
}