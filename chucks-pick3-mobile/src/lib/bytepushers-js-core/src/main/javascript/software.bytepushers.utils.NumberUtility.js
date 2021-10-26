/*global window, document, BytePushers*/
/* jshint -W108, -W109, -W079 */

var window = window || {};
var module = module || {};

(function (window) {
    'use strict';

    var BytePushers;

    if (window.BytePushers !== undefined && window.BytePushers !== null) {
        BytePushers = window.BytePushers;
    } else {
        window.BytePushers = {};
        BytePushers = window.BytePushers;
    }

    BytePushers.NumberUtility = BytePushers.namespace("software.bytepushers.utils.NumberUtility");
    BytePushers.NumberUtility.padLeft = function padLeft(number, length) {
        if (number === undefined || number === null) {
            number = "";
        }

        if (number.length >= length) {
            return number;
        }

        return padLeft("0" + number, length);
    };
    BytePushers.NumberUtility.padRight = function padRight(number, length) {
        if (number === undefined || number === null) {
            number = "";
        }

        if (number.length >= length) {
            return number;
        }

        return padRight(number + "0", length);
    };
    BytePushers.NumberUtility.isSingleDigit = function isSingleDigit(number) {
        if (0 < number && number <= 9) {
            return true;
        }

        return false;
    };
    BytePushers.NumberUtility.isNotANumber = function isNotANumber(d) {
        return isNaN(d);
    };
    BytePushers.NumberUtility.isANumber = function isANumber(d) {
        if (d === "") {
            return false;
        }
        return !isNaN(d);
    };

    module.exports = BytePushers;
}(window));
