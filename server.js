var async = require('async')
var express = require('express')
var levelup = require('levelup')

var app = express()
var db = levelup('./db')

var Lock = require('./src/lock.js')

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

Lock.input.watch(function(err, value) {	
	Lock.toggle.writeSync(value);
});