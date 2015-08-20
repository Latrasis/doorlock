var async = require('async')
var express = require('express')

var Lock = require('./src/lock.js')

Lock.input.watch(function(err, value) {	
	Lock.toggle.writeSync(value);
});