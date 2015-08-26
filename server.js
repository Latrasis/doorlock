var async = require('async')
var express = require('express')
var levelup = require('levelup')

var db = levelup('./db')

var Lock = require('./src/lock.js')
var Users = require('./src/users.js')(db)


Lock.input.watch(function(err, value) {	
	Lock.toggle.writeSync(value);
});