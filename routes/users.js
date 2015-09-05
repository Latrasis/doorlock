var async = require('async');
var express = require('express')
var router = express.Router()

var bcrypt = require('bcrypt')

module.exports = function(app) {
	app.use('/users', router);
};

// Get All Users
router.get('/', function(req, res) {

	async.waterfall([
		function getUsers(done) {
			var users = [];
			req.db.createKeyStream()
				.on('data', function(data) {
					users.push(data);
				})
				.on('error', done)
				.on('end', function() {
					done(null, users)
				})
		},
		// Pass Credentials
		function sendUsers(users, done) {
			res.json(users).sendStatus(200)
			done();
		}
	], function(err) {
		if(err){
			res.sendStatus(400, err)
		} else {
			res.sendStatus(200)
		}
	})

});

// Create User
router.post('/', function(req, res) {

	var username = req.body["username"];
	var pass = req.body["password"];

	async.waterfall([
		// Check if username is Valid
		function isvalidusername(done) {
			if(username && typeof username == 'string'){
				done()
			} else {
				done(Error('Invalid Username'))
			}
		},
		// Make Key
		function makeKeyHash(done) {
			if(pass){
				bcrypt.hash(pass, 10, done)
			} else {
				done(Error('Invalid Password'))
			}
		},
		// Pass Credentials
		function passCred(hash, done) {
			req.db.put(username)
		}
	], function(err) {
		if(err){
			res.sendStatus(400, err)
		} else {
			res.sendStatus(200)
		}
	})
});

// Delete User
router.del('/', function(req, res) {
	req.db.del(req.body['username'], function(err) {
		if(err){
			res.sendStatus(401, err)
		} else {
			res.sendStatus(200, 'Deleted User '+req.body['username'])
		}
	})
});
