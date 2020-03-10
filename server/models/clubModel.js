const db = require("./index");

module.exports = {
  category: (options, callback) => {
    var sql = `SELECT * FROM club_category;`;
    db.connect(sql, options, callback);
  },
  clubList: (options, callback) => {
    var sql = `SELECT a.club_id,club_name,club_avatar,user_id FROM clubs a LEFT JOIN (SELECT * FROM user_club WHERE user_id = ?) b ON a.club_id= b.club_id  WHERE category_id = ?;`
    db.connect(sql, options, callback);
  },
  followedClubs: (options, callback) => {
    var sql = `SELECT b.club_id, club_name, club_avatar FROM user_club AS a INNER JOIN clubs AS b ON a.club_id= b.club_id WHERE a.user_id = ?;`
    db.connect(sql, options, callback);
  },
  followClub: (options, callback) => {
    var sql = `INSERT INTO user_club(user_id, club_id) VALUE (?, ?);`
    db.connect(sql, options, callback);
  },
  cancleFollow: (options, callback) => {
    var sql = `DELETE FROM user_club WHERE user_id = ? AND club_id = ?;`
    db.connect(sql, options, callback);
  },
  getDetail: (options, callback) => {
    var sql = `SELECT a.*, b.category_name, c.user_id FROM (clubs a LEFT JOIN club_category b ON a.category_id = b.category_id) LEFT JOIN (SELECT * FROM user_club WHERE user_id = ?) c ON a.club_id = c.club_id WHERE a.club_id = ?;`
    db.connect(sql, options, callback);
  },
  hotClub: (options, callback) => {
    var sql = `SELECT club_id, club_name, club_avatar FROM clubs WHERE ishot = 1;`
    db.connect(sql, options, callback);
  },
  clubCount: (options, callback) => {
    var sql = `SELECT COUNT(*) num FROM clubs;`
    db.connect(sql, options, callback);
  },
  clubPage: (options, callback) => {
    var sql = `SELECT * FROM clubs LIMIT ? OFFSET ?;`
    db.connect(sql, options, callback);
  }
}