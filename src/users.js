var async = require('async');

module.exports = function Users(db) {

	/**
	 * Add User Key
	 * @param {string}   name   User Name
	 * @param {hash}   pubkey Public Key
	 * @param {Function} done   callback
	 */
	function addUser(name, pubkey, done) {
		
		async.waterfall([
			// Check if Name is Valid
			function validName() {
				if(name && typeof name == 'string'){
					done()
				} else {
					done(Error('Invalid Name'))
				}
			},
			// Check if PubKey is Valid
			function validKey() {
				if(pubkey && typeof pubkey == 'number'){
					done()
				} else {
					done(Error('Invalid Public Key'))
				}
			},
			function addUser() {
				db.put(name, pubkey, done)
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