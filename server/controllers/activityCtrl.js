const activityModel = require("../models/activityModel");

module.exports = {
  activityList: (req, res) => {
    activityModel.activityList(req.query, (err, result) => {
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
  clubActivity: (req, res) => {
    activityModel.clubActivity(req.query.clubId, (err, result) => {
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
  activityDetail: (req, res) => {
    activityModel.activityDetail([req.query.userId, req.query.activityId], (err, result) => {
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
  joinActivity: (req, res) => {
    activityModel.joinActivity([req.body.userId, req.body.activityId], (err, result) => {
      if(err) return res.json({
        msg: err,
        state: "0" 
      });
      res.json({
        state: "200"
      });
    });
  },
  getBanner: (req, res) => {
    activityModel.getBanner(req.query, (err, result) => {
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
}