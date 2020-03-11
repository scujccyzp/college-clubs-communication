var express = require('express');
var router = express.Router();
const activityCtrl = require("../controllers/activityCtrl")

//获取活动列表
router.get('/activitylist', activityCtrl.activityList);

//获取所有活动
router.get('/allactivity', activityCtrl.allActivity);

//根据社团id获取活动
router.get('/clubactivity', activityCtrl.clubActivity);

//获取活动详情
router.get('/activitydetail', activityCtrl.activityDetail);

//获取报名活动
router.post('/joinactivity', activityCtrl.joinActivity);

//获取活动banner
router.get('/banner', activityCtrl.getBanner);

module.exports = router;