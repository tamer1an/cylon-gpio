/*
 * HCSR04 driver
 * http://cylonjs.com
 *
 */

"use strict";

var Cylon = require("cylon");
// var AnalogSensor = require("./analog-sensor");
/**
 *
 *  HC-SR04 Driver
 *
 *  @constructor hcsr04
 *
 *  VCC to arduino 5v
 *  GND to arduino GND
 *
 *  Echo to Arduino pin 11
 *  Trig to Arduino pin 10
 *
 * @param {Object} opts options object
 * @param {String|Number} opts.pin the pin to connect to
 * @param {Number} opts.freq frequency
 */
var hcsr04 = module.exports = function Hcsr04(opts) {
  Hcsr04.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.pin2 = opts.pin2;

  if (this.pin==null ||  this.pin2==null){
    throw new Error("No pin specified for the sensor. Cannot proceed");
  }

  this.currentValue = false;

  // Include a list of commands that will be made available to external APIs.
  this.commands = {
    // This is how you register a command function for the API;
    // the command should be added to the prototype, see below.
    distance: this.distance,
    turnOn: this.turnOn,
    turnOff: this.turnOff,
  };
};

Cylon.Utils.subclass(hcsr04, Cylon.Driver);
// Cylon.Utils.subclass(hcsr04, AnalogSensor);


hcsr04.prototype.distance = function(callback) {
  Cylon.Logger.log("distance", this.currentValue);

  // this.turnOff();
  // setTimeout(this.turnOn,20);
  // setTimeout(this.turnOff,100);

   return this.analogVal;
};

/**
 * Starts the Direct Pin
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
hcsr04.prototype.start = function(callback) {
  Cylon.Logger.log("Sensor on pin " + this.pin + " started");

  // this.connection.digitalRead(this.pin, function(err, data) {
  //   if (err) { return; }
  //   this.currentValue = data;
  //   Cylon.Logger.log(data)
  // }.bind(this));

  callback();
};

/**
 * Stops the Direct Pin
 *
 * @param {Function} callback to be triggered when stopped
 * @return {void}
 */
hcsr04.prototype.halt = function(callback) {
  callback();
};

hcsr04.prototype.turnOn = function(callback) {
  Cylon.Logger.log('turnOn')

  // this.connection.digitalWrite(this.pin, 1, callback);

  callback();
};

/**
 * Writes a LOW (0) value to the pin, turning the LED off.
 *
 * Also sets `this.isHigh` to `false`.
 *
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
hcsr04.prototype.turnOff = function(callback) {
  Cylon.Logger.log('turnOff')

  // this.connection.digitalWrite(this.pin, 0, callback);

  callback();
};