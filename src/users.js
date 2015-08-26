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
			function isvalidName() {
				if(name && typeof name == 'string'){
					done()
				} else {
					done(Error('Invalid Name'))
				}
			},
			// Make Key
			function makeKeyHash() {
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
			function passCred(key) {
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
	function checkUser(name, key) {
		db.get(name, function(err, val) {
			if(!err && key === val){
				return true;
			} else {
				return false;
			}
		})
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
			function isvalidName() {
				if(name && typeof name == 'string'){
					done()
				} else {
					done(Error('Invalid Name'))
				}
			},
			// Check if Key is Valid
			function isvalidKey() {
				if(key && typeof key == 'number'){
					done()
				} else {
					done(Error('Invalid Public Key'))
				}
			},
			function addUser() {
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