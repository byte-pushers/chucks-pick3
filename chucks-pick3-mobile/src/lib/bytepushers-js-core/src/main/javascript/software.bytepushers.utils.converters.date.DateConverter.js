/*global BytePushers, window, module*/
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

    BytePushers.converters = BytePushers.namespace("software.bytepushers.utils.converters");
    BytePushers.converters.DateConverter = BytePushers.namespace("software.bytepushers.utils.converters.DateConverter");
    BytePushers.converters.DateConverter.MMDDYYYY_DATE_FORMAT = 0;
    BytePushers.converters.DateConverter.MMMDDYYYY_DATE_FORMAT = 1;
    BytePushers.converters.DateConverter.YYYYMMDDThhmmsssTZD_DATE_FORMAT = 2;
    BytePushers.converters.DateConverter.MDDYYYY_DATE_FORMAT = 3;
    BytePushers.converters.DateConverter.YYYYMMDD_DATE_FORMAT = 4;
    BytePushers.converters.DateConverter.convertToDate_MDDYYYY = function (d) {
        var month, day, year, date = new Date();
        if (d.length !== 7) {
            throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " should be in format MDDYYYY.");
        }
        if (BytePushers.NumberUtility.isNotANumber(d)) {
            throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
        }
        month = Number(d.substring(0, 2));
        day = Number(d.substring(2, 4));
        year = Number(d.substring(4));
        date.setFullYear(year, month, day);
        date.setHours(0, 0, 0, 0);
        return date;
    };
    BytePushers.converters.DateConverter.convertToDate_MMDDYYYY = function (d) {
        var month, day, year, date = new Date();
        if (d.length !== 8) {
            throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " should be in format MMDDYYYY.");
        }
        if (BytePushers.NumberUtility.isNotANumber(d)) {
            throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
        }
        month = Number(d.substring(0, 2)) - 1;
        day = Number(d.substring(2, 4));
        year = Number(d.substring(4));
        date.setFullYear(year, month, day);
        date.setHours(0, 0, 0, 0);
        return date;
    };
    BytePushers.converters.DateConverter.convertToDate_MMMDDYYYY = function (d) {
        var month, day, year, date = new Date();
        if (d.length !== 9) {
            throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " should be in format MMMDDYYYY.");
        }
        if (BytePushers.NumberUtility.isNotANumber(d.substring(3))) {
            throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
        }
        month = Number(BytePushers.models.Month.getMonthIndex(d.substring(0, 3)));
        day = Number(d.substring(3, 5));
        year = Number(d.substring(5));
        date.setFullYear(year, month, day);
        date.setHours(0, 0, 0, 0);
        return date;
    };
    BytePushers.converters.DateConverter.convertToDate_YYYYMMDD = function (d) {
        var month, day, year, date = new Date();
        if (d.length !== 8) {
            throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d + " should be in format YYYYMMDD.");
        }
        if (BytePushers.NumberUtility.isNotANumber(d.substring(0, 4))) {
            throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d.substring(0, 4) + " must be numeric.");
        }
        if (BytePushers.NumberUtility.isNotANumber(d.substring(4, 6))) {
            throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d.substring(4, 6) + " must be numeric.");
        }
        if (BytePushers.NumberUtility.isNotANumber(d.substring(6))) {
            throw new BytePushers.exceptions.InvalidParameterException("Date String: " + d.substring(6) + " must be numeric.");
        }
        year = Number(d.substring(0, 4));
        month = Number(d.substring(4, 6)) - 1;
        day = Number(d.substring(6));
        date.setFullYear(year, month, day);
        date.setHours(0, 0, 0, 0);
        return date;
    };
    BytePushers.converters.DateConverter.convertToDate_YYYYMMDDThhmmsssTZD = function (iso8601DateString) {
        return BytePushers.converters.DateConverter.convertToISO8601Date(iso8601DateString);
    };
    BytePushers.converters.DateConverter.convertToString_MMDDYYY = function (d, delimiter) {
        var date = new Date(d),
            month = String(date.getMonth() + 1),
            day = String(date.getDate()),
            year = date.getFullYear(),
            dateArray;

        if (Object.isUndefinedOrNull(delimiter)) {
            delimiter = "";
        }

        if (month.length < 2) {
            month = '0' + month;
        }

        if (day.length < 2) {
            day = '0' + day;
        }

        dateArray = [month, day, year];

        return dateArray.join(delimiter);
    };
    BytePushers.converters.DateConverter.convertToString_YYYYMMDD = function (d, delimiter) {
        if (Object.isUndefinedOrNull(delimiter)) {
            delimiter = "";
        }

        if (!Object.isDate(d)) {
            throw new Error("parameter d must be a Date Object.");
        }

        return d.getFullYear() + delimiter + BytePushers.NumberUtility.padLeft(d.getMonth() + 1, 1) + delimiter + d.getDate();
    };
    BytePushers.converters.DateConverter.convertToString_YYYYMMDDThhmmsssTZD = function (d) {
        if (!Object.isDate(d)) {
            throw new Error("parameter d must be a Date Object.");
        }

        return d.toISOString();
    };
    BytePushers.converters.DateConverter.convertToISO8601Date = function (iso8601DateString) {
        var regexp = new RegExp("([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?"),
            d = iso8601DateString.match(new RegExp(regexp)),
            date;/*,
            offset = 0;*/

        if (d === null) {
            throw new BytePushers.exceptions.InvalidParameterException("ISO 8601 Date String: " + d + " should be in ISO 8601 format YYYY-MM-DDThh:mm:ss:sTZD.");
        }


        date = new Date(d[1], 0, 1);

        if (d[3]) {
            date.setMonth(d[3] - 1);
        }
        if (d[5]) {
            date.setDate(d[5]);
        }
        if (d[7]) {
            date.setHours(d[7]);
        }
        if (d[8]) {
            date.setMinutes(d[8]);
        }
        if (d[10]) {
            date.setSeconds(d[10]);
        }
        if (d[12]) {
            date.setMilliseconds(Number("0." + d[12]) * 1000);
        }
        /*if (d[14]) {
            offset = (Number(d[16]) * 60) + Number(d[17]);
            offset *= ((d[15] === '-') ? 1 : -1);
        }*/

        //offset -= date.getTimezoneOffset();
        //time = (date.getTime() + (offset * 60 * 1000));
        //date.setTime(time);
        return date;
    };
    BytePushers.converters.DateConverter.convertToDate = function (d, dateFormat) {
        var date = null;
        switch (dateFormat) {
        case BytePushers.converters.DateConverter.MDDYYYY_DATE_FORMAT:
            date = BytePushers.converters.DateConverter.convertToDate_MDDYYYY(d);
            break;
        case BytePushers.converters.DateConverter.MMDDYYYY_DATE_FORMAT:
            date = BytePushers.converters.DateConverter.convertToDate_MMDDYYYY(d);
            break;
        case BytePushers.converters.DateConverter.MMMDDYYYY_DATE_FORMAT:
            date = BytePushers.converters.DateConverter.convertToDate_MMMDDYYYY(d);
            break;
        case BytePushers.converters.DateConverter.YYYYMMDDThhmmsssTZD_DATE_FORMAT:
            date = BytePushers.converters.DateConverter.convertToDate_YYYYMMDDThhmmsssTZD(d);
            break;
        case BytePushers.converters.DateConverter.YYYYMMDD_DATE_FORMAT:
            date = BytePushers.converters.DateConverter.convertToDate_YYYYMMDD(d);
            break;
        }
        return date;
    };
    BytePushers.converters.DateConverter.convertToString = function (d, dateFormat, delimiter) {
        var date = null;
        switch (dateFormat) {
        case BytePushers.converters.DateConverter.MMDDYYYY_DATE_FORMAT:
            date = BytePushers.converters.DateConverter.convertToString_MMDDYYY(d, delimiter);
            break;
        case BytePushers.converters.DateConverter.YYYYMMDD_DATE_FORMAT:
            date = BytePushers.converters.DateConverter.convertToString_YYYYMMDD(d, delimiter);
            break;
        case BytePushers.converters.DateConverter.YYYYMMDDThhmmsssTZD_DATE_FORMAT:
            date = BytePushers.converters.DateConverter.convertToString_YYYYMMDDThhmmsssTZD(d, delimiter);
            break;
        }
        return date;
    };

    BytePushers.models = BytePushers.models || BytePushers.namespace("software.bytepushers.models");
    BytePushers.models.Month = BytePushers.namespace("software.bytepushers.models.Month");

    /**
     * <p>Static field that is used to get calendar full name, abbreviated names, and total calendar days.</p>
     * @static
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    BytePushers.models.Month.getMonthIndex = function (abbr) {
        var i = -1;
        BytePushers.models.Month.monthNames.forEach(function (monthName, index) {
            if (monthName.abbr === abbr) {
                i = index;
            }
        });
        return i;
    };
    /**
     * <p>Static field that is used to get calendar total calendar days of the previous month.</p>
     * @static
     * @function
     * @param {@link <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
     * @returns {@link <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} The total days in the previous month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    BytePushers.models.Month.getPreviousMonthTotalDays = function (date) {
        if (date.getMonth() === 0) {
            return BytePushers.models.Month.monthNames[11].getTotalDays(date.getFullYear());
        }

        return BytePushers.models.Month.monthNames[date.getMonth() - 1].getTotalDays(date.getFullYear());
    };

    /**
     * <p>Static function that is used to get the total calendar days of the next month.</p>
     * @static
     * @function
     * @param <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> date Represents some arbitrary calendar date.
     * @returns {@link <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} The total days in the next month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    BytePushers.models.Month.getNextMonthTotalDays = function (date) {
        if (date.getMonth() === 11) {
            return BytePushers.models.Month.monthNames[0].getTotalDays(date.getFullYear());
        }

        return BytePushers.models.Month.monthNames[date.getMonth() + 1].getTotalDays(date.getFullYear());
    };
    /**
     * <p>Static field for the list of month.</p>
     * @static
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    BytePushers.models.Month.monthNames = [
        {
            "name": "January",
            "abbr": "Jan",
            "getTotalDays": function () {
                return 31;
            }
        },
        {
            "name": "February",
            "abbr": "Feb",
            "getTotalDays": function (year) {
                if (year) {
                    if (year % 4 === 0) {
                        return 29;
                    } else {
                        return 28;
                    }
                }
                throw ("Expected parameter(Year) is not defined.");
            }
        },
        {
            "name": "March",
            "abbr": "Mar",
            "getTotalDays": function () {
                return 31;
            }
        },
        {
            "name": "April",
            "abbr": "Apr",
            "getTotalDays": function () {
                return 30;
            }
        },
        {
            "name": "May",
            "abbr": "May",
            "getTotalDays": function () {
                return 31;
            }
        },
        {
            "name": "June",
            "abbr": "Jun",
            "getTotalDays": function () {
                return 30;
            }
        },
        {"name": "July", "abbr": "Jul", "getTotalDays": function () {
            return 31;
        }},
        {"name": "August", "abbr": "Aug", "getTotalDays": function () {
            return 31;
        }},
        {"name": "September", "abbr": "Sep", "getTotalDays": function () {
            return 30;
        }},
        {"name": "October", "abbr": "Oct", "getTotalDays": function () {
            return 31;
        }},
        {"name": "November", "abbr": "Nov", "getTotalDays": function () {
            return 30;
        }},
        {"name": "December", "abbr": "Dec", "getTotalDays": function () {
            return 31;
        }}
    ];
    /**
     * <p>Static field for the list of weekdays.</p>
     * @static
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    BytePushers.models.Month.weekdayNames = [
        {"name": "Sundays", "abbr": "Sun."},
        {"name": "Monday", "abbr": "Mon."},
        {"name": "Tuesday", "abbr": "Tue."},
        {"name": "Wednesday", "abbr": "Wed."},
        {"name": "Thursday", "abbr": "Thu."},
        {"name": "Friday", "abbr": "Fri."},
        {"name": "Saturday", "abbr": "Sat."}
    ];

    module.exports = BytePushers;
}(window));
