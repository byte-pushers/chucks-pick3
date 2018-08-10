var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function HtmlParseException(message) {
    'use strict';
    HtmlParseException.prototype.superclass.apply(this);

    this.name = "HtmlParseException";
    this.code = Exception.Code.HTML_PARSE_ERROR;
    this.message = message;

    this.toString = function() {
        return String.format("HtmlParseException: {1}", this.message);
    };
}

HtmlParseException.prototype = BytePushers.inherit(Exception.prototype);
HtmlParseException.prototype.constructor = HtmlParseException;
HtmlParseException.prototype.superclass = Exception;

module.exports = HtmlParseException;
