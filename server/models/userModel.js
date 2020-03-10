const db = require("./index");

module.exports = {
  login:(options, callback) => {
    var sql = `select * from users where user_phone = ?`;
    db.connect(sql, options, callback);
  },
  userInfo:(options, callback) => {
    var sql = `select * from users where user_id = ?`;
    db.connect(sql, options, callback);
  },
  allUsers:(options, callback) => {
    var sql = `select * from users`;
    db.connect(sql, options, callback);
  }
}