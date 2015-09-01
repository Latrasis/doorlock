var Gpio = require('onoff').Gpio;

const OPEN = 1;
const CLOSED = 0;
const OPENTIME = 3000;

var lock = new Gpio(12, 'out')
var rfid = new Gpio(4, 'in', 'both')
// var input = new Gpio(5, 'in', 'both')

process.on('SIGINT', function() {
	input.unexport();
	lock.unexport();
	process.exit();
});

module.exports = Door = {
	rfid: {
		read: Rfid
	},
	// keypad: {
	// 	read: Read
	// },
	lock: {
		open: Open
	}
};

function Rfid(done) {

	rfid.watch(function (err, rfid) {
		if (err) {
			done(err)
		} else {
			// TODO
			// Capture RFID --> Need RFID API
			done()
		}
	});
};

function Keypad(done) {};

// Opens the Door for a time interval
function Open(done) {
	lock.writeSync(OPEN)
	setTimeout(function() {
		lock.writeSync(CLOSED)
		done()
	}, OPENTIME)
};
