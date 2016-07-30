"use strict";

var Cylon = require("cylon");


/**
 *
 *  HC-SR04 Driver
 *  VCC to arduino 5v
 *  GND to arduino GND
 *  Echo to Arduino pin 7
 *  Trig to Arduino pin 8
 *
 *  @constructor hcsr04
 */

var hcsr04 = module.exports = function Hcsr04(opts) {
  Hcsr04.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  // Include a list of commands that will be made available to external APIs.
  this.commands = {
    // This is how you register a command function for the API;
    // the command should be added to the prototype, see below.
    hello: this.hello
  };
};

Cylon.Utils.subclass(hcsr04, Cylon.Driver);

// echoPin 7 // Echo Pin
// trigPin 8 // Trigger Pin
// LEDPin 11 // Onboard LED


hcsr04.prototype.start = function(callback) {
  callback();
};

hcsr04.prototype.halt = function(callback) {
  callback();
};

hcsr04.prototype.hello = function() {
  Cylon.Logger.info("Hello World!");
};
