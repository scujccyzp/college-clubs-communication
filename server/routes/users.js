var express = require('express');
var router = express.Router();
const userCtrl = require("../controllers/userCtrl")


//登录请求
router.post('/login', userCtrl.login);

//查询某个用户信息
router.get('/userinfo', userCtrl.userInfo);

//查询所有用户信息
router.get('/allusers', userCtrl.allUsers);

module.exports = router;
