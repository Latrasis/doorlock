var async = require('async')
var express = require('express')
var glob = require('glob')

var app = express()
var db = levelup('./db')

// Set Middleware
app.use('/', function(req, res, next) {
	req.db = db;
	next();
})

// Set Routes
var routes = glob.sync('./routes/*.js');
routes.forEach(function (route) {
	require(route)(app);
});

app.listen(8000);