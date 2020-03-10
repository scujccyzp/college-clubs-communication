var express = require('express');
var router = express.Router();
const clubCtrl = require("../controllers/clubCtrl")


//获取社团分类
router.get('/category', clubCtrl.category);

//查询分类下对应所有社团
router.get('/clubList', clubCtrl.clubList);

//查询用户关注社团
router.get('/followedClubs', clubCtrl.followedClubs);

//关注社团
router.post('/followClub', clubCtrl.followClub);

//取消关注社团
router.post('/canclefollow', clubCtrl.cancleFollow);

//获取社团详情
router.get('/detail', clubCtrl.getDetail);

//获取热门社团
router.get('/hotclub', clubCtrl.hotClub);

//获取社团总数
router.get('/clubcount', clubCtrl.clubCount);

//获取社团分页数据
router.get('/clubpage', clubCtrl.clubPage);

module.exports = router;