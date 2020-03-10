var createError = require('http-errors');
var express = require('express');
var path = require('path');
var jwt = require('express-jwt');
var { secretKey } = require("./util/config"); // 获取密钥

var usersRouter = require('./routes/users');
var clubsRouter = require('./routes/clubs');
var newsRouter = require('./routes/news');
var activityRouter = require('./routes/activity');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname));

// 跨域
app.all("*", function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有网站访问
  res.header('Access-Control-Allow-Methods', 'GET,POST'); // 允许请求方式
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With'); // 允许的请求头
  next(); // 交给下一个中间件处理
});

app.use('/users', usersRouter);//用户

app.use('/clubs', clubsRouter);//社团

app.use('/news', newsRouter);//新闻

app.use('/activity', activityRouter);//活动

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log("服务器错误：", err)

  //判断权限，无权限直接响应以下内容
  if(err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: "invalud token",
      error: err
    })
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
