/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function DrawingTimeInFutureException(drawingTime, drawingDate, expectedDrawTime) {
    'use strict';
    
    DrawingTimeInFutureException.prototype.superclass.apply(this);

    this.name = "DrawingTimeInFutureException";
    this.code = Exception.Code.DRAWING_TIME_IN_FUTURE;
    this.drawingTime = drawingTime;
    this.drawingDate = drawingDate;
    this.expectedDrawTime = expectedDrawTime;

    this.toString = function () {
        return String.format("DrawingTimeInFutureException: the requested drawing time \"{1}\" is in the future. Check back on {2} after {3}",
            this.drawingTime, this.drawingDate, this.expectedDrawTime);
    };
}

DrawingTimeInFutureException.prototype = BytePushers.inherit(Exception.prototype);
DrawingTimeInFutureException.prototype.constructor = DrawingTimeInFutureException;
DrawingTimeInFutureException.prototype.superclass = Exception;

module.exports = DrawingTimeInFutureException;
