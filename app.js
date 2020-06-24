var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var router = require('./controller/controller');

var app = express();

//查看引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 跨域设置
app.use(cors({
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
    "Access-Control-Allow-Credentials": "true"
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

//捕获404并转发到错误处理程序
app.use(function (req, res, next) {
    next(createError(404));
});

//错误处理程序
app.use(function (err, req, res, next) {
    //设置本地变量，仅在开发中提供错误
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //呈现错误页面
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
