var async = require('async');

module.exports = function Users(db) {

	/**
	 * Create User Credentials
	 * @param  {string}   name User Name
	 * @param  {string}   pass Password
	 * @param  {Function} done Callback
	 */
	function createUser(name, pass, done) {
		async.waterfall([
			// Check if Name is Valid
			function isvalidName(done) {
				if(name && typeof name == 'string'){
					done()
				} else {
					done(Error('Invalid Name'))
				}
			},
			// Make Key
			function makeKeyHash(done) {
				if(pass){
					// Use Password
					// to Generate Key
					// TODO
					var hash;
					done(null, hash)
				} else {
					done(Error('Invalid Password'))
				}
			},
			// Pass Credentials
			function passCred(key, done) {
				done(null, {name, key})
			}
		], done)
	};

	/**
	 * Check User Cred
	 * @param  {string} name User Name
	 * @param  {number} key  Key
	 * @return {bool}   	 True if User is Valid
	 */
	function checkUser(name, pass, done) {
		async.waterfall([
			function findUser(done) {
				db.get(name, done)
			},
			function checkKey(key, done) {
				// Hash Password and Check if they Match
				// TODO
				done();
			}], done)
	};

	/**
	 * Add User Key
	 * @param {string}	 name   User Name
	 * @param {hash}	 key Public Key
	 * @param {Function} done   callback
	 */
	function addUser(name, key, done) {
		
		async.waterfall([
			// Check if Name is Valid
			function isvalidName(done) {
				if(name && typeof name == 'string'){
					done()
				} else {
					done(Error('Invalid Name'))
				}
			},
			// Check if Key is Valid
			function isvalidKey(done) {
				if(key && typeof key == 'number'){
					done()
				} else {
					done(Error('Invalid Public Key'))
				}
			},
			function addUser(done) {
				db.put(name, key, done)
			}], done )
	};

	/**
	 * Remove User Key
	 * @param  {string}   name User Name
	 * @param  {Function} done callback
	 */
	function removeUser(name, done) {
		db.del(name, done)
	};

	/**
	 * Fetch User Key
	 * @param  {string}   name User Name
	 * @param  {Function} done Callback
	 */
	function getUser(name, done) {
		db.get(name, done)
	};

	return {
		add: addUser,
		remove: removeUser,
		get: getUser
	}
};