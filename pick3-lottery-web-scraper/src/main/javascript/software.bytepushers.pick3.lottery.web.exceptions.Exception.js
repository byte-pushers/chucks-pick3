var BytePushers = require('bytepushers-js-oop');

function Exception(drawingTime, drawingDate, expectedDrawTime) {
    'use strict';
    Exception.prototype.superclass.apply(this);

    this.name = "Exception";
    this.code = Exception.Code.BASE_EXCEPTION;

    this.toString = function() {
        return String.format("DrawingTimeInFutureException: the requested drawing time \"{1}\" is in the future. Check back on {2} after {3}",
            this.drawingTime, this.drawingDate, this.expectedDrawTime);
    }
}

Exception.prototype = BytePushers.inherit(Error.prototype);
Exception.prototype.constructor = Exception;
Exception.prototype.superclass = Error;

Exception.Code = {};
Exception.Code.BASE = "exception.base";
Exception.Code.DRAWING_TIME_IN_FUTURE = "exception.drawTimeInFuture";
Exception.Code.DRAWING_TIME_NOT_FOUND = "exception.drawTimeNotFound";
Exception.Code.DRAWING_YEAR_NOT_AVAILABLE = "exception.drawYearNotAvailable";
Exception.Code.HTML_PARSE_ERROR = "exception.htmlParseError";

module.exports = Exception;
