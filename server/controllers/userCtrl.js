const userModel = require("../models/userModel");
var jwt = require("jsonwebtoken");
var { secretKey } = require("../util/config"); // 获取密钥

module.exports = {
  login: (req, res) => {
    console.log("登录请求：", req.body);

    userModel.login([req.body.username], (err, result) => {
      console.log('登录请求', err, result);
      if (err) return res.json({
        msg: "数据库查找错",
        state: '0',
        err: err
      });

      if (result.length == 0) {
        res.json({
          msg: "账号不存在",
          state: "1001",
        })
      } else {
        console.log('密码判断：', result[0]);
        if (req.body.userpass == result[0].user_password) {
          // 生成 token
          const token = jwt.sign({
            username: req.body.username
          }, secretKey, {
            expiresIn: 1000 * 6000 // 过期时间
          })
          console.log(token);
          res.json({
            msg: "登录成功",
            state: "200",
            token,
            userId: result[0].user_id
          });
        } else {
          res.json({
            msg: "登录失败",
            state: "1002"
          });
        }
      }
    })
  },
  userInfo: (req, res) => {
    userModel.userInfo(req.query.userId, (err, result) => {
      if(err) return res.json({
        msg: err,
        state: "0" 
      });
      res.json({
        state: "200",
        data: result 
      });
    });
  },
  allUsers: (req, res) => {
    userModel.allUsers(req.query, (err, result) => {
      if(err) return res.json({
        msg: err,
        state: "0" 
      });
      res.json({
        state: "200",
        data: result 
      });
    });
  }
}