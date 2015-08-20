var Gpio = require('onoff').Gpio;

module.exports = Lock = {
	toggle: new Gpio(12, 'out'),
	input: new Gpio(4, 'in', 'both')
};