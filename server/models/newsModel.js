const db = require("./index");

module.exports = {
  hotNews:(options, callback) => {
    var sql = `SELECT a.news_id, a.club_id, b.club_name, b.club_avatar,a.news_title, a.news_time, a.news_content, a.news_img FROM club_news a LEFT JOIN clubs b ON a.club_id = b.club_id LIMIT 2;`;
    db.connect(sql, options, callback);
  },
  clubNews:(options, callback) => {
    var sql = `SELECT a.news_id, a.club_id, b.club_name, b.club_avatar,a.news_title, a.news_time, a.news_content, a.news_img FROM club_news a LEFT JOIN clubs b ON a.club_id = b.club_id WHERE a.club_id = ?;`;
    db.connect(sql, options, callback);
  },
  editNews:(options, callback) => {
    var sql = `INSERT INTO club_news(club_id, news_time, news_title, news_content) VALUES(?, ?, ?, ?);`;
    db.connect(sql, options, callback);
  }
}