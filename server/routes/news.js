var express = require('express');
var router = express.Router();
const newsCtrl = require("../controllers/newsCtrl")

//获取热门新闻
router.get('/hotnews', newsCtrl.hotNews);

//根据社团id获取新闻
router.get('/clubnews', newsCtrl.clubNews);

//存入新闻
router.post('/edit', newsCtrl.editNews);

module.exports = router;