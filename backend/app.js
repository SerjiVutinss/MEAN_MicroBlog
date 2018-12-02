/**
 * Express Server Setup
 */

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

// Advanced Setup (Mongo and Auth)
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var dbConfig = require('./config/database');

// set this to remove a deprecation warning realted to uniqueness in db
mongoose.set('useCreateIndex', true);
// Bring in the data model
require('./models/db.model');
// Now you bring in the passport config
require('./config/passport');

// End Advanced Setup

var app = express();
// Bring in the routes for the API
var indexRouter = require('./routes/index');
var postRouter = require('./routes/post.routes');
var userRouter = require('./routes/user.routes');
var commentRouter = require('./routes/comment.routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Initialise passport before routing
app.use(passport.initialize());

// Use the API routes when path starts with /api
app.use('/api', indexRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);

console.log("API up and running");

/**
 * Error Handling
 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;