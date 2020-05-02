var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {
  decodeToken
} = require('./public/javascripts/token.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  let islogin;
  if(req.url !== '/users'){
    if(req.headers.authorization){
      islogin = decodeToken(req.headers.authorization);
    }
    if(islogin){
      next();
     }else{
      //  res.send(null);
       res.status(401);
      next();
     }
  }else{
    next();
  }
  // console.log(req.url,req.headers.authorization);
})
//当token失效返回提示信息
app.use((err, req, res, next) => {
  if (err.status === 401) {
    return res.status(err.status).json({
      status: err.status,
      msg: 'The token is invalid',
      error: err.name + ':' + err.message
    })
  }
})

app.use('/home', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
