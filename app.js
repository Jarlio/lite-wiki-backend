var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var nodeRoute = require('./routes/node');
var tagRoute = require('./routes/tag');

var app = express();

/* allow all origins */
app.use(cors())

/* connect to database */
const database_ul = require('./Utils/database');
const mongoDB = `mongodb://${database_ul.username}:${database_ul.password}@ds127604.mlab.com:27604/lite-wiki`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(r => console.log('connected to database'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/node', nodeRoute);
app.use('/tag', tagRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err});
});


module.exports = app;
