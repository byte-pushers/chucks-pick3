/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function DrawingYearNotAvailableException(drawingYear) {
    'use strict';
    
    DrawingYearNotAvailableException.prototype.superclass.apply(this);

    this.name = "DrawingYearNotAvailableException";
    this.code = Exception.Code.DRAWING_YEAR_NOT_AVAILABLE;
    this.drawingYear = drawingYear;

    this.toString = function () {
        return String.format("DrawingYearNotAvailableException: data is not available for the requested drawing year \"{1}\".",
            this.drawingYear);
    };
}

DrawingYearNotAvailableException.prototype = BytePushers.inherit(Exception.prototype);
DrawingYearNotAvailableException.prototype.constructor = DrawingYearNotAvailableException;
DrawingYearNotAvailableException.prototype.superclass = Exception;

module.exports = DrawingYearNotAvailableException;
