var async = require('async')
var express = require('express')


var Gpio = require('onoff').Gpio;
var led = new Gpio(14, 'out');
var button = new Gpio(4, 'in', 'both');

button.watch(function(err, value) {
	led.writeSync(value);
});