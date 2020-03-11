const newsModel = require("../models/newsModel");

module.exports = {
  hotNews: (req, res) => {
    newsModel.hotNews(req.query, (err, result) => {
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
  clubNews: (req, res) => {
    newsModel.clubNews(req.query.clubId, (err, result) => {
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
  editNews:(req, res) => {
    newsModel.editNews([req.body.clubId, req.body.time, req.body.title, req.body.content], (err, result) => {
      if(err) return res.json({
        msg: err,
        state: "0" 
      });
      res.json({
        state: "200"
      });
    });
  }
}