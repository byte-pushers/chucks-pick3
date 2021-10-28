/*global BytePushers, window, module*/
/* jshint -W108, -W109, -W079 */
var window = window || {};
var module = module || {};

(function (window) {
    "use strict";

    var BytePushers;

    if (window.BytePushers !== undefined && window.BytePushers !== null) {
        BytePushers = window.BytePushers;
    } else {
        window.BytePushers = {};
        BytePushers = window.BytePushers;
    }

    BytePushers.exceptions = BytePushers.namespace("software.bytepushers.exceptions");
    BytePushers.exceptions.InvalidParameterException = function (message) {
        Error.call(this, message);
        BytePushers.exceptions.InvalidParameterException.prototype = new Error();
        this.name = "BytePushers.exceptions.InvalidParameterException";
        this.message = message;
    };
    BytePushers.exceptions.InvalidParameterException.prototype.toString = function () {
        return this.name + "(" + this.message + ")";
    };
    BytePushers.exceptions.NullPointerException = function (message) {
        Error.call(this, message);
        BytePushers.exceptions.NullPointerException.prototype = new Error();
        this.name = "BytePushers.exceptions.NullPointerException";
        this.message = message;
    };
    BytePushers.exceptions.NullPointerException.prototype.toString = function () {
        return this.name + "(" + this.message + ")";
    };
    BytePushers.exceptions.ExpectedArrayIsEmptyException = function (message) {
        Error.call(this, message);
        BytePushers.exceptions.ExpectedArrayIsEmptyException.prototype = new Error();
        this.name = "BytePushers.exceptions.ExpectedArrayIsEmptyException";
        this.message = message;
    };
    BytePushers.exceptions.ExpectedArrayIsEmptyException.prototype.toString = function () {
        return this.name + "(" + this.message + ")";
    };
    BytePushers.exceptions.InvalidDateRangeException = function (message) {
        Error.call(this, message);
        BytePushers.exceptions.InvalidDateRangeException.prototype = new Error();
        this.name = "BytePushers.exceptions.InvalidDateRangeException";
        this.message = message;
    };
    BytePushers.exceptions.InvalidDateRangeException.prototype.toString = function () {
        return this.name + "(" + this.message + ")";
    };

    module.exports = BytePushers;
}(window));
