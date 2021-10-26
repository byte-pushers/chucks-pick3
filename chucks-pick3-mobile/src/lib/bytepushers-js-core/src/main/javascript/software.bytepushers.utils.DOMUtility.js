/*global $, window, document, BytePushers, module*/
/* jshint -W108, -W109, -W079 */

var window = window || {};
var module = module || {};

(function (window, document) {
    'use strict';

    var BytePushers;

    if (window.BytePushers !== undefined && window.BytePushers !== null) {
        BytePushers = window.BytePushers;
    } else {
        window.BytePushers = {};
        BytePushers = window.BytePushers;
    }

    BytePushers.DOMUtility = BytePushers.namespace("software.bytepushers.utils.DOMUtility");
    BytePushers.DOMUtility.addListener = null;
    BytePushers.DOMUtility.removeListener = null;
    BytePushers.DOMUtility.querySelector = null;
    BytePushers.DOMUtility.querySelectorAll = null;
    BytePushers.DOMUtility.filterMetaData = function (data) {
        data = data.replace(/<meta\s[\w\W]*>/gi, "");
        return data;
    };
    // the implementation
    if (typeof window.addEventListener === 'function') {
        BytePushers.DOMUtility.addListener = function (el, type, fn) {
            el.addEventListener(type, fn, false);
        };
        BytePushers.DOMUtility.removeListener = function (el, type, fn) {
            el.removeEventListener(type, fn, false);
        };
    } else if (typeof document.attachEvent === 'function') { // IE
        BytePushers.DOMUtility.addListener = function (el, type, fn) {
            el.attachEvent('on' + type, fn);
        };
        BytePushers.DOMUtility.removeListener = function (el, type, fn) {
            el.detachEvent('on' + type, fn);
        };
    } else { // older browsers
        BytePushers.DOMUtility.addListener = function (el, type, fn) {
            el['on' + type] = fn;
        };
        BytePushers.DOMUtility.removeListener = function (el, type) {
            el['on' + type] = null;
        };
    }
    if (typeof document.querySelector === "function") {
        BytePushers.DOMUtility.querySelector = function (selector) {
            return document.querySelector(selector);
        };
    } else if (typeof document.getElementsByClassName === "function") {
        BytePushers.DOMUtility.querySelector = function (selector) {
            return document.getElementsByClassName(selector);
        };
    } else if (typeof $ === "function") {
        BytePushers.DOMUtility.querySelector = function (selector) {
            return $(selector);
        };
    } else {
        throw ("document.querySelector() method is not supported by your browser.  Please contact the administrator for this app.");
    }
    if (typeof document.querySelectorAll === "function") {
        BytePushers.DOMUtility.querySelectorAll = function (selector) {
            return document.querySelectorAll(selector);
        };
    } else if (typeof document.getElementsByClassName === "function") {
        BytePushers.DOMUtility.querySelectorAll = function (selector) {
            return document.getElementsByClassName(selector);
        };
    } else if (typeof $ === "function") {
        BytePushers.DOMUtility.querySelector = function (selector) {
            return $(selector);
        };
    } else {
        throw ("document.querySelectorAll() method is not supported by your browser.  Please contact the administrator for this app.");
    }
    module.exports = BytePushers;
}(window, document));
