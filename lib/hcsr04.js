/*
 * HCSR04 driver
 * http://cylonjs.com
 *
 */

"use strict";

var Cylon = require("cylon");
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
 * @param {Number} opts.freq led frequency
 * @param {Object} [opts.pwmScale] pwm scale
 * @param {Number} opts.pwmScale.bottom pwm bottom
 * @param {Number} opts.pwmScale.top pwm top
 */
var hcsr04 = module.exports = function Hcsr04(opts) {
  Hcsr04.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.pin2 = opts.pin2;

  if (this.pin==null ||  this.pin2==null){
    throw new Error("No pin specified for the sensor. Cannot proceed");
  }

  // Include a list of commands that will be made available to external APIs.
  this.commands = {
    // This is how you register a command function for the API;
    // the command should be added to the prototype, see below.
    distance: this.distance,

    digital_read: this.digitalRead,
    digital_write: this.digitalWrite,

    analog_read: this.analogRead,
    analog_write: this.analogWrite,

    pwm_write: this.pwmWrite,
    servo_write: this.servoWrite,

    turnOn: this.turnOn,
    turnOff: this.turnOff,
  };
};
Cylon.Utils.subclass(hcsr04, Cylon.Driver);


hcsr04.prototype.distance = function(callback) {
  Cylon.Logger.log("distance");
  return 'hello end'
};

/**
 * Starts the Direct Pin
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
hcsr04.prototype.start = function(callback) {
  Cylon.Logger.debug("Sensor on pin " + this.pin + " started");

  this.connection.digitalRead(this.pin, function(err, data) {
    if (err) { return; }
    this.currentValue = data;
    this.emit("range", this.distance());
  }.bind(this));

  // Cylon.Utils.every(50, function() {
  //   this.data.push(this.currentValue);
  //   if (this.data.length > 5) {
  //     this.data.shift();
  //   }
  //
  //   if (this.averageData() <= 0.5 && !this.isPressed) {
  //     this.isPressed = true;
  //     this.emit("push");
  //   } else if (this.averageData() > 0.5 && this.isPressed) {
  //     this.isPressed = false;
  //     this.emit("release");
  //   }
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
  this.isHigh = true;
  this.connection.digitalWrite(this.pin, 1, callback);
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
  this.isHigh = false;
  this.connection.digitalWrite(this.pin, 0, callback);
};

/**
 * Writes a digital value to the pin
 *
 * @param {Number} value value to write to the pin
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
hcsr04.prototype.digitalWrite = function(value, callback) {
  this.connection.digitalWrite(this.pin, value, callback);
};

/**
 * Writes an analog value to the pin
 *
 * @param {Number} value value to write to the pin
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
hcsr04.prototype.analogWrite = function(value, callback) {
  this.connection.analogWrite(this.pin, value, callback);
};

/**
 * Reads the value from the pin
 *
 * Triggers the provided callback when the pin state has been read.
 *
 * @param {Function} callback triggered when the pin state has been read
 * @return {void}
 * @publish
 */
hcsr04.prototype.digitalRead = function(callback) {
  this._read("d", callback);
};

/**
 * Reads the value from the pin
 *
 * Triggers the provided callback when the pin state has been read.
 *
 * @param {Function} callback triggered when the pin state has been read
 * @return {void}
 * @publish
 */
hcsr04.prototype.analogRead = function(callback) {
  this._read("a", callback);
};

/**
 * Writes a servo value to the pin
 *
 * @param {Number} angle angle value to write to the pin
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
hcsr04.prototype.servoWrite = function(angle, callback) {
  return this.connection.servoWrite(this.pin, angle, callback);
};

/**
 * Writes a PWM value to the pin
 *
 * @param {Number} value value to write to the pin
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
hcsr04.prototype.pwmWrite = function(value, callback) {
  return this.connection.pwmWrite(this.pin, value, callback);
};


////  RW EXAMPLE /////////////////////////////////
// this.connection.digitalRead(this.pin, function(err, data) {
// this.connection.digitalWrite(this.pin2, 1, callback);
//