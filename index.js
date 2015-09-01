var levelup = require('levelup')
var bcrypt = require('bcrypt')

var Door = require('./src/door.js')
var db = levelup('./db')

var httpServer = require('child_process').fork('./server.js')

// Start Child Server
Door.keypad.read(function(err, credentials) {
	if(!err && key){
		// Fetch User Credentials
		// Compare Hash
	}
})