// PACKAGES //
var path = require('path');
var fs = require('fs');
var express = require('express');
var bodyParser = require("body-parser");
var morgan = require("morgan");
var dotenv = require('dotenv').config();

// IMPORTS //
var indexRoutes = require('./routes/index');
var config = require("../config/database.js");

// CREATE APP //
var app = express();

// MIDDLEWARE //
app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// KEYS
app.set('superSecret', config.secret); 

// ROUTES //
app.use('/', indexRoutes);

// ERROR HANDLER //
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
