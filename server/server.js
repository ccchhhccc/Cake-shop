var express = require('express');
var mysql = require('mysql');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); 

// for parsing application/json
app.use(bodyParser.json()); 
 // for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//引入路由监听
var cake = require('./routes/cake.js');
var send = require('./routes/send.js');
var user = require('./routes/user.js');
//设置静态文件夹
app.use(express.static('public'));
//数据库链接
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'fozoon'
});

//监听
cake.listen(app,conn);
send.listen(app,conn);
user.listen(app,conn);

app.listen(1234);
console.log('start server');