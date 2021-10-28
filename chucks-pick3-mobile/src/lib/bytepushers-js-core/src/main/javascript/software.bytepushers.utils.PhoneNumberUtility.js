/*global BytePushers window*/
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

    var specialChar = [' ', '(', ')', '-', '.'];

    function doPhoneNumberFormat(phoneNumber) {
        var phoneNumberArray = (phoneNumber) ? phoneNumber.replace(/\D/g, '').split("") : [];
        var formatPhoneNumber;

        if (Array.isArray(phoneNumberArray) && phoneNumberArray.length === 10) {
            formatPhoneNumber = "(" + phoneNumberArray[0] + phoneNumberArray[1] + phoneNumberArray[2] + ") " + phoneNumberArray[3] + phoneNumberArray[4] + phoneNumberArray[5] + "-" + phoneNumberArray[6] + phoneNumberArray[7] + phoneNumberArray[8] + phoneNumberArray[9];
        }

        return formatPhoneNumber;
    }

    function formatPhoneNumber(object) {
        return doPhoneNumberFormat(object.value, specialChar);
    }

    BytePushers = BytePushers || {};
    BytePushers.PhoneNumberUtility = BytePushers.namespace("software.bytepushers.utils.PhoneNumberUtility");
    BytePushers.PhoneNumberUtility.formatPhoneNumber = function (object) {
        return formatPhoneNumber(object);
    };

    module.exports = BytePushers;
}(window));

