/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function WinningNumberNotFoundException(digit1, digit2, digit3) {
    'use strict';

    WinningNumberNotFoundException.prototype.superclass.apply(this);

    this.name = "WinningNumberNotFoundException";
    this.code = Exception.Code.DRAWING_TIME_IN_FUTURE;
    this.digit1 = digit1;
    this.digit2 = digit2;
    this.digit3 = digit3;

    this.toString = function () {
        return String.format("WinningNumberNotFoundException: Cound not find winning number.  Num1: \"{1}\",  Num2: \"{2}\",  Num3: \"{3}\"",
            this.digit1, this.digit2, this.digit3);
    };
}

WinningNumberNotFoundException.prototype = BytePushers.inherit(Exception.prototype);
WinningNumberNotFoundException.prototype.constructor = WinningNumberNotFoundException;
WinningNumberNotFoundException.prototype.superclass = Exception;

module.exports = WinningNumberNotFoundException;
