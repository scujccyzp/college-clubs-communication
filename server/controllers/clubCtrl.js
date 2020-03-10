const clubModel = require("../models/clubModel");

module.exports = {
  category: (req, res) => {
    clubModel.category(req.query, (err, result) => {
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
  clubList: (req, res) => {
    clubModel.clubList([req.query.userId, req.query.categoryId], (err, result) => {
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
  followedClubs: (req, res) => {
    clubModel.followedClubs(req.query.userId, (err, result) => {
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
  followClub: (req, res) => {
    clubModel.followClub([req.body.userId, req.body.clubId], (err, result) => {
      if(err) return res.json({
        msg: err,
        state: "0" 
      });
      res.json({
        state: "200"
      });
    });
  },
  cancleFollow: (req, res) => {
    clubModel.cancleFollow([req.body.userId, req.body.clubId], (err, result) => {
      if(err) return res.json({
        msg: err,
        state: "0" 
      });
      res.json({
        state: "200"
      });
    });
  },
  getDetail: (req, res) => {
    clubModel.getDetail([req.query.userId, req.query.clubId], (err, result) => {
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
  hotClub: (req, res) => {
    clubModel.hotClub(req.query, (err, result) => {
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
  clubCount: (req, res) => {
    clubModel.clubCount(req.query, (err, result) => {
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
  clubPage: (req, res) => {
    clubModel.clubPage([Number(req.query.pageSize), Number(req.query.pageNum)], (err, result) => {
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