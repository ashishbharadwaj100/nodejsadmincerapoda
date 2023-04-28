var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var productRouter = require('./routes/product');
var articleRouter = require('./routes/article');
var tagRouter = require('./routes/tag');

var categoryRouter = require('./routes/category');

var cors = require('cors');
var path = require('path');
var logger = require('morgan');

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './../views')));

app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/scss/bootstrap.scss")));

app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/product',productRouter);
app.use('/article',articleRouter);
app.use('/tag',tagRouter);
app.use('/category',categoryRouter);
// app.use('/updateTag',updateTagRouter);

app.get('/', function (req, res) {
  res.send('Hello World!');
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;