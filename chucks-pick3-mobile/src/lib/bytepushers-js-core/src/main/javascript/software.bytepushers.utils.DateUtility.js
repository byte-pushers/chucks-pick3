/*global window, document, BytePushers, module*/
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

    BytePushers.DateUtility = BytePushers.namespace("software.bytepushers.utils.DateUtility");
    BytePushers.DateUtility.date_sort_asc = function (date1, date2) {
        // This is a comparison function that will result in dates being sorted in
        // ASCENDING order. As you can see, JavaScript's native comparison operators
        // can be used to compare dates. This was news to me.
        if (date1 > date2) {
            return 1;
        }
        if (date1 < date2) {
            return -1;
        }
        return 0;
    };
    BytePushers.DateUtility.date_sort_desc = function (date1, date2) {
        // This is a comparison function that will result in dates being sorted in
        // DESCENDING order.
        if (date1 > date2) {
            return -1;
        }
        if (date1 < date2) {
            return 1;
        }
        return 0;
    };
    /*checks if string passed in is valid MM/DD/YYYY date*/
    BytePushers.DateUtility.isDateString_MMDDYYYY = function (dateString) {
        /*credit: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript/6178341#6178341*/

        /* First check for the pattern */
        if (!(/^\d{1,2}\/\d{1,2}\/\d{4}$/).test(dateString)) {
            return false;
        }

        /* Parse the date parts to integers */
        var parts = dateString.split("/"),
            day = parseInt(parts[1], 10),
            month = parseInt(parts[0], 10),
            year = parseInt(parts[2], 10),
            monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        /* Check the ranges of month and year */
        if (year < 1000 || year > 3000 || month === 0 || month > 12) {
            return false;
        }

        /* Adjust for leap years */
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            monthLength[1] = 29;
        }

        /* Check the range of the day */
        return day > 0 && day <= monthLength[month - 1];
    };

    /**
     * Utility method that converts some date value into to an actual Date.
     *
     * @param someDateValue Represents the a valid date value.
     * @returns {Date} that was converted from date value.
     */
    BytePushers.DateUtility.convertToDate = function (someDateValue) {
        var someDate = null;

        if (someDateValue instanceof Date) {
            someDate = someDateValue;
        } else if (someDateValue instanceof String) {
            someDate = new Date(someDateValue);
        } else if (typeof someDateValue === "string") {
            someDate = new Date(someDateValue);
        } else if (someDateValue instanceof Number) {
            someDate = new Date(someDateValue);
        } else if (typeof someDateValue === "number") {
            someDate = new Date(someDateValue);
        }

        return someDate;
    };

    /**
     * Utility method that determines if the two dates have the same calendar date.
     *
     * @param someDate1 Represents the first date to compare.
     * @param someDate2 Represents the second date to compare.
     * @returns {boolean} that indicates whether or not the two calendar date are the same.
     */
    BytePushers.DateUtility.isSameDate = function (someDate1, someDate2) {
        var sameDate = false;

        if (Object.isDate(someDate1) && Object.isDate(someDate2)) {
            if (someDate1.getFullYear() === someDate2.getFullYear()) {
                if (someDate1.getMonth() === someDate2.getMonth()) {
                    if (someDate1.getDate() === someDate2.getDate()) {
                        sameDate = true;
                    }
                }
            }
        }

        return sameDate;
    };

    module.exports = BytePushers;
}(window));

         /* Function to  calculatBirthdate */
function calculateBirthday(birthDate) {
    let now = new Date();
    let currentYear = now.getFullYear();
    let birthYear = birthDate.getFullYear();
    let age = currentYear - birthYear;
    if (now < new Date(birthDate.setFullYear(currentYear))) {
        age = age -1;
    }
    return age;
}
console.log(calculateBirthday(new Date(1982, 11, 4)));
console.log(calculateBirthday(new Date(1962, 0, 1)));



