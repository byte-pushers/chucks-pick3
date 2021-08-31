/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function DrawingTimeNotFoundException(drawingTime, drawingDate) {
    'use strict';

    DrawingTimeNotFoundException.prototype.superclass.apply(this);

    this.name = "DrawingTimeNotFoundException";
    this.code = Exception.Code.DRAWING_TIME_NOT_FOUND;
    this.drawingTime = drawingTime;
    this.drawingDate = drawingDate;

    this.toString = function () {
        return String.format("DrawingTimeNotFoundException: the requested drawing time \"{1}\" was not available for date {2}",
            this.drawingTime, this.drawingDate);
    };
}

DrawingTimeNotFoundException.prototype = BytePushers.inherit(Exception.prototype);
DrawingTimeNotFoundException.prototype.constructor = DrawingTimeNotFoundException;
DrawingTimeNotFoundException.prototype.superclass = Exception;

module.exports = DrawingTimeNotFoundException;
