/*global window, document, module*/
/* jshint -W108, -W109, -W079 */
/*jslint bitwise: true, regexp: true*/

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
    /****************************************************************************************************
    * BEGIN Array Extensions */
    if (!Array.prototype.every) {
        Array.prototype.every = function (fun, funParameter) {
            var t = Object.create(this),
                len = t.length >>> 0,
                i;

            if (this === null) {
                throw new TypeError();
            }

            if (typeof fun !== "function") {
                throw new TypeError();
            }

            for (i = 0; i < len; i = i + 1) {
                if (t.hasOwnProperty(i) && !fun.call(funParameter, t[i], i, t)) {
                    return false;
                }
            }

            return true;
        };
    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.com/#x15.4.4.18
    if (!Array.prototype.forEach) {

        Array.prototype.forEach = function forEach(callback, thisArg) {

            var T, k, O, len, obj = {}, kValue;

            if (this === null) {
                throw new TypeError("this is null or not defined");
            }

            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            O = Object.create(this);

            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            len = O.length >>> 0; // Hack to convert O.length to a UInt32

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (obj.toString.call(callback) !== "[object Function]") {
                throw new TypeError(callback + " is not a function");
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (thisArg) {
                T = thisArg;
            }

            // 6. Let k be 0
            k = 0;

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (Object.prototype.hasOwnProperty.call(O, k)) {

                    // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                    kValue = O[k];

                    // ii. Call the Call internal method of callback with T as the this value and
                    // argument list containing kValue, k, and O.
                    callback.call(T, kValue, k, O);
                }
                // d. Increase k by 1.
                k = k + 1;
            }
            // 8. return undefined
        };
    }

    if (!Array.prototype.some) {
        Array.prototype.some = function (fun, functionParameter) {
            var t = Object.create(this),
                len = t.length >>> 0,
                i;

            if (this === null) {
                throw new TypeError();
            }

            if (typeof fun !== "function") {
                throw new TypeError();
            }

            for (i = 0; i < len; i = i + 1) {
                if (t.hasOwnProperty(i) && fun.call(functionParameter, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    if (!Array.prototype.isArray) {
        Array.prototype.isArray = function (arg) {
            var targetArray = (arg === true) ? arg : this;
            return Object.prototype.toString.call(targetArray) === "[object Array]";
        };
    }

    /* END Array Extensions *
     ****************************************************************************************************/

    /****************************************************************************************************
     * BEGIN Date Extensions */
    /**
     * <p>Function that is used to determine if two dates objects have the same date.</p>
     * @function
     * @param {@link Date} The date to evaluate against this object.
     * @return <a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a> True if the date passed in is equal the date object; otherwise return false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.prototype.isDateEqualTo = function (date) {
        if (this.getFullYear() === date.getFullYear()) {
            if (this.getMonth() === date.getMonth()) {
                if (this.getDate() === date.getDate()) {
                    return true;
                }
            }
        }
        return false;
    };

    /**
     * <p>Function that is used to determine if two dates objects have the same date and time.</p>
     * @function
     * @param {@link Date} The date to evaluate against this object.
     * @return {@link <a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a>} True if the date passed in is equal the date object; otherwise return false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.prototype.isDateEqualToDateAndTime = function (date) {
        if (this.getFullYear() === date.getFullYear()) {
            if (this.getMonth() === date.getMonth()) {
                if (this.getDate() === date.getDate()) {
                    if (this.getHours() === date.getHours()) {
                        if (this.getMinutes() === date.getMinutes()) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };

    /**
     * <p>Function that is used to determine a date is the day after another date.</p>
     * @function
     * @param {@link Date} The date to evaluate against this object.
     * @return <a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a> True if the date is the day after the original date; otherwise return false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.prototype.isDateEqualToTomorrow = function (date) {
        if (this.getFullYear() === date.getFullYear()) {
            if (this.getMonth() === date.getMonth()) {
                if (this.getDate() + 1 === date.getDate()) {
                    return true;
                }
            } else if (this.getMonth() + 1 === date.getMonth()) {
                if (this.isLastDayInMonth() && date.getDate() === 1) {
                    return true;
                }
            }
        } else if (this.getFullYear() + 1 === date.getFullYear()) {
            if (this.getMonth() === 11 && date.getMonth() === 0) {
                if (this.getDate() === 31 && date.getDate() === 1) {
                    return true;
                }
            }
        }
        return false;
    };

    /**
     * <p>Function that is used to determine a date is the day before another date.</p>
     * @function
     * @param {@link Date} The date to evaluate against this object.
     * @return <a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a> True if the date is the day before the original date; otherwise return false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.prototype.isDateEqualToYesterday = function (date) {
        if (this.getFullYear() === date.getFullYear()) {
            if (this.getMonth() === date.getMonth()) {
                if (this.getDate() - 1 === date.getDate()) {
                    return true;
                }
            } else if (this.getMonth() === date.getMonth() + 1) {
                if (this.getDate() === 1 && date.isLastDayInMonth()) {
                    return true;
                }
            }
        } else if (this.getFullYear() - 1 === date.getFullYear()) {
            if (this.getMonth() === 0 && date.getMonth() === 11) {
                if (this.getDate() === 1 && date.getDate() === 31) {
                    return true;
                }
            }
        }
        return false;
    };

    /**
     * <p>Tells you whether it is the last day in a month or not.</p>
     * @private
     * @returns <a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a> True if it is the last day of the month, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.prototype.isLastDayInMonth = function () {
        var lastDayInMonth = this.getCurrentMonthTotalDays();
        if (this.getDate() === lastDayInMonth) {
            return true;
        }
        return false;
    };

    /**
     * <p>Function that is used to get calendar total calendar days of the previous month.</p>
     * @function
     * @returns <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a> The total days in the previous month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.prototype.getPreviousMonthTotalDays = function () {
        if (this.getMonth() === 0) {
            return Date.monthNames[11].getTotalDays(this.getFullYear());
        }

        return Date.monthNames[this.getMonth() - 1].getTotalDays(this.getFullYear());
    };

    /**
     * <p>Function that is used to get the total calendar days of the next month.</p>
     * @function
     * @returns <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a> The total days in the next month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.prototype.getNextMonthTotalDays = function () {
        if (this.getMonth() === 11) {
            return Date.monthNames[0].getTotalDays(this.getFullYear());
        }

        return Date.monthNames[this.getMonth() + 1].getTotalDays(this.getFullYear());
    };

    /**
     * <p>Function that is used to get the total calendar days of the next month.</p>
     * @function
     * @returns <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a> The total days in the next month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.prototype.getCurrentMonthTotalDays = function () {
        if (this.getMonth() === 11) {
            return Date.monthNames[0].getTotalDays(this.getFullYear());
        }

        return Date.monthNames[this.getMonth()].getTotalDays(this.getFullYear());
    };

    /**
     * <p>Adds time to a date object.</p>
     * @param <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a> time Represents the time you want to add to the date.
     *
     * @returns {String} A new Date object with the specified time added.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.prototype.addTime = function (time) {
        var newDate = new Date(),
            wholeNumber = (time > 0) ? Math.floor(time) : Math.ceil(time),
            fraction = ((time - wholeNumber).toFixed(2) * 100),
            hourInMilliseconds = 1000 * 60 * 60 * wholeNumber,
            minutesInMilliseconds = 1000 * 60 * fraction;

        newDate.setTime(this.getTime());
        newDate.setTime(newDate.getTime() + hourInMilliseconds);
        newDate.setTime(newDate.getTime() + minutesInMilliseconds);

        return newDate;
    };
    /**
     * <p>Static function that tells you whether a date is the last day in a month or not.</p>
     * @private
     * @static
     * @param <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Number</a> time Represents the time you want to add to the date.
     * @returns <a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a> True if it is the last day of the month, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.isLastDayInMonth = function (date) {
        var lastDayInMonth = date.getCurrentMonthTotalDays();
        if (date.getDate() === lastDayInMonth) {
            return true;
        }
        return false;
    };

    /**
     * <p>Static function that gets month name.</p>
     * @private
     * @static
     * @param <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a> index Represents the position of the month in a month array.
     * @param <a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a> useAbbr An optional boolean flag that governs whether the
     * full name of the month is returned or its abbreviation.
     * @returns {String} The name of the month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.getMonthName = function (index, getAbbr) {
        if (getAbbr) {
            return this.monthNames[index].abbr;
        }

        return this.monthNames[index].name;
    };

    /**
     * <p>Static field for the list of month.</p>
     * @static
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Date.monthNames = [
        {"name": "January", "abbr": "Jan", "getTotalDays": function () { return 31; } },
        {"name": "February", "abbr": "Feb", "getTotalDays": function (year) {
            if (year) {
                return (year % 4 === 0) ? 29 : 28;
            }

            throw ("Expected parameter(Year) is not defined.");
        }},
        {"name": "March", "abbr": "Mar", "getTotalDays": function () { return 31; }},
        {"name": "April", "abbr": "Apr", "getTotalDays": function () { return 30; }},
        {"name": "May", "abbr": "May", "getTotalDays": function () { return 31; }},
        {"name": "June", "abbr": "Jun", "getTotalDays": function () { return 30; }},
        {"name": "July", "abbr": "Jul", "getTotalDays": function () { return 31; }},
        {"name": "August", "abbr": "Aug", "getTotalDays": function () { return 31; }},
        {"name": "September", "abbr": "Sep", "getTotalDays": function () { return 30; }},
        {"name": "October", "abbr": "Oct", "getTotalDays": function () { return 31; }},
        {"name": "November", "abbr": "Nov", "getTotalDays": function () { return 30; }},
        {"name": "December", "abbr": "Dec", "getTotalDays": function () { return 31; }}
    ];
    /* END Date Extensions *
     ****************************************************************************************************/

    /****************************************************************************************************
     * BEGIN Object Extensions */
    /**
     * <p>Static function that tells you whether an object is an array or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is an array.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is an array, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isArray = function (someArray) {
        var result = false;
        if (Object.isDefined(someArray)) {
            if (someArray.constructor.toString().indexOf("Array") > -1) {
                result = true;
            }
        }

        return result;
    };

    /**
     * <p>Static function that tells you whether an object is a date or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is a date.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is an date, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isDate = function (someDate) {
        var result = false;
        if (Object.isDefined(someDate)) {
            if (typeof someDate === "object" && someDate instanceof Date) {
                result = true;
            }
        }

        return result;
    };
    /**
     * <p>Static function that tells you whether an object is a string or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is a string.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is an string, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isString = function (someString) {
        var result = false;
        if (Object.isDefined(someString)) {
            if (typeof someString === "string" || (typeof someString === "object" && someString instanceof String)) {
                if (someString.trim().length > 0) {
                    result = true;
                }
            }
        }

        return result;
    };

    /**
     * <p>Static function that tells you whether an object is numeric or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is numeric.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is numeric, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isNumeric = function (someNumber) {
        var result = false;
        if (Object.isDefined(someNumber) && !isNaN(someNumber)) {
            if (typeof someNumber === "number" || (typeof someNumber === "object" && someNumber instanceof Number)) {
                result = true;
            }
        }

        return result;
    };

    /**
     * <p>Static function that tells you whether an object is a boolean or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is a boolean.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is a boolean, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isBoolean = function (someBoolean) {
        var result = false;
        if (Object.isDefined(someBoolean)) {
            if (typeof someBoolean === "boolean" || (typeof someBoolean === "object" && someBoolean instanceof Boolean)) {
                result = true;
            }
        }

        return result;
    };

    /**
     * <p>Static function that tells you whether an object is defined or not.</p>
     * @static
     * @param <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Object of some type</a> The object that will be tested to see if it is defined.
     * @returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a> True if an object is defined, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    Object.isDefined = function (target) {
        var result = false;
        if (target !== undefined && target !== null) {
            result = true;
        }
        return result;
    };
    Object.isRegEx = function (someRegEx) {
        var result = false;

        if (Object.isDefined(someRegEx)) {
            if ((typeof someRegEx === "object" ||  someRegEx instanceof RegExp)) {
                result = true;
            }
        }

        return result;
    };
    Object.getProperty = function (obj, p) {
        var pFunction = "get" + p.substring(0, 1).toUpperCase() + p.substring(1),
            value = null;

        if (Object.isString(obj)) {
            obj = JSON.parse(obj);
            value = obj[p];
        } else {
            if (Object.hasProperty(obj, p)) {
                value = obj[p];
            } else if (typeof obj[pFunction] === "function") {
                value = obj[pFunction]();
            }
        }

        return value;
    };
    Object.setProperty = function (obj, p, v) {
        var pFunction = "set" + p.substring(0, 1).toUpperCase() + p.substring(1);

        if (Object.hasProperty(obj, p)) {
            obj[p] = v;
        } else if (typeof obj[pFunction] === "function") {
            obj[pFunction](v);
        }
    };
    Object.hasProperty = function (obj, p) {
        var hasProperty = false;

        if (obj.hasOwnProperty(p)) {
            hasProperty = true;
        }

        return hasProperty;
    };
    Object.hasFunction = function (obj, p) {
        var hasFunction = false,
            pSetFunction = "set" + p.substring(0, 1).toUpperCase() + p.substring(1),
            pGetFunction = "get" + p.substring(0, 1).toUpperCase() + p.substring(1);

        if (typeof obj[pSetFunction] === "function") {
            hasFunction = true;
        } else if (typeof obj[pGetFunction] === "function") {
            hasFunction = true;
        }

        return hasFunction;
    };
    Object.isFunction = function (target) {
        var isFunction = false;

        if (Object.isDefined(target)) {
            if (typeof target === "function") {
                isFunction = true;
            }
        }

        return isFunction;
    };

    Object.isConstructorFunction = function (targetFunction) {
        var isConstructorFunction = false,
            isNotFirstLetterUppercase;

        if (Object.isFunction(targetFunction)) {
            isNotFirstLetterUppercase = !(/^[A-Z]/.test(targetFunction.name));
            isConstructorFunction = true;
        } else {
            throw new BytePushers.exceptions.InvalidParameterException("Function(" + targetFunction + ") is not a Function.");
        }

        if (isNotFirstLetterUppercase) {
            throw new BytePushers.exceptions.InvalidParameterException("Fist letter of Function(" + targetFunction + ") name must be capitalized.");
        }

        return isConstructorFunction;
    };

    if (Function.prototype.name === undefined) {
        // Add a custom property to all function values
        // that actually invokes a method to get the value
        Object.defineProperty(Function.prototype, 'name', {
            get: function () {
                return (/function ([^(]*)/).exec(this)[1];
            }
        });
    }

    /* END Object Extensions *
     ****************************************************************************************************/

    /****************************************************************************************************
     * BEGIN String Extensions */
    /**
     * <p>Function that is used to trim the white spaces from the beginning and end of the string.</p>
     * @function
     * @return <a href="http://www.w3schools.com/jsref/jsref_obj_string.asp">String</a> The value of the string after it has been trimmed.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };

    /**
     * <p>Function that is used to determine if a string includes a certain character or string.</p>
     * @function
     * @param <a href="http://www.w3schools.com/jsref/jsref_obj_string.asp">String</a> The string we are checking if is included.
     * @return <a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a> True of the string is included, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    if (!String.prototype.includes) {
        String.prototype.includes = function () {
            return String.prototype.indexOf.apply(this, arguments) !== -1;
        };
    }

    /**
     * <p>Function that is used to format a sentence to camel case. (e.g. Hello world => helloWorld).</p>
     * @function
     * @return <a href="http://www.w3schools.com/jsref/jsref_obj_string.asp">String</a> The value of the string after it has been formatted to camel case.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    String.prototype.toCamelCase = function () {
        return this.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2) {
            if (p2) {
                return p2.toUpperCase();
            }
            return p1.toLowerCase();
        });
    };

    /**
     * <p>Function that is used to turn a string that is in camel case format to a Normal sentence format. (e.g. helloWorld => Hello World)</p>
     * @function
     * @return <a href="http://www.w3schools.com/jsref/jsref_obj_string.asp">String</a> The value of the string after it has been formatted to a normal sentence format.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    String.prototype.toNormalCase = function () {
        return this.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z])/g, '$1 $2').replace(/^./, function (str) {return str.toUpperCase(); });
    };

    /**
     * <p>Convenience function that will format a string with dynamic variables.</p>
     * @static
     * @param {...string} string - first argument is the string to be formatted.  The remaining arguments are the format items (e.g. "{0}")
     * @function
     * @return <a href="http://www.w3schools.com/jsref/jsref_obj_string.asp">String</a> The value of the string after it has been formatted.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    String.format = function (someString) {
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        var theString = someString, i, regEx;

        // start with the second argument (i = 1)
        for (i = 0; i < arguments.length; i = i + 1) {
            // "gm" = RegEx options for Global search (more than one instance)
            // and for Multiline search
            regEx = new RegExp("\\{" + i + "\\}", "gm");
            theString = theString.replace(regEx, arguments[i]);
        }

        return theString;
    };

    if (!String.prototype.substringBefore) {
        /**
         * Convenience method taht returns the sub-string found before the search criteria.
         *
         * @param searchCriteria  Represent a search string to base ending index on.
         * @returns {*}
         */
        String.prototype.substringBefore = function (searchCriteria) {
            var searchResult = searchCriteria,
                searchedStringIndex = this.search(searchCriteria);

            if (searchedStringIndex > 0) {
                searchResult = this.substring(0, searchedStringIndex);
            }

            return searchResult;
        };
    }

    if (!String.prototype.substringAfter) {
        /**
         * Convenience method that returns the sub-string found after search criteria.
         *
         * @param searchCriteria  Represent a search string to base starting index on.
         * @returns {*}
         */
        String.prototype.substringAfter = function (searchCriteria) {
            var searchResult = searchCriteria,
                searchedStringIndex = this.search(searchCriteria);

            if (searchedStringIndex > -1 && searchedStringIndex + searchCriteria.length <= this.length) {
                searchResult = this.substring(searchedStringIndex + searchCriteria.length, this.length);
            }

            return searchResult;
        };
    }
    /* END String Extensions *****************************************************************************************************/

    BytePushers.implementsInterface = function (o) { /*, ... */
        var i,
            m,
            arg;

        for (i = 1; i < arguments.length; i = i + 1) { // for each argument after o var arg = arguments[i];
            arg = arguments[i];
            switch (typeof arg) { // If arg is a:
            case 'string': // string: check for a method with that name
                if (typeof o[arg] !== "function") {
                    return false;
                }
                break;
            case 'function': // function: use the prototype object instead
            // If the argument is a function, we use its prototype object arg = arg.prototype;
            // fall through to the next case
            case 'object': // object: check for matching methods
                for (m in arg) { // For each property of the object
                    if (arg.hasOwnProperty(m)) {
                        if (typeof arg[m] !== "function") {
                            break;
                        } // skip non-methods
                        if (typeof o[m] !== "function") {
                            return false;
                        }
                    }
                }
                break;
            }
        }

        // If we're still here, then o implements everything
        return true;
    };

    BytePushers.namespace = function (ns_string) {
        var parts = ns_string.split('.'), parent = BytePushers;
        // strip redundant leading global
        if (parts[0] === "BytePushers") {
            parts = parts.slice(1);
        }
        parts.forEach(function (part, index) {
            // create a property if it doesn't exist
            if (parent[part] === undefined) {
                parent[part] = {};
            }
            parent = parent[part];
        });
        return parent;
    };

    /**
     * inherit() returns a newly created object that inherits properties from the prototype object p.
     * It uses the ECMAScript 5 function Object.create() if it is defined, and otherwise falls.
     *
     * @param p Represents the a prototype property of an object you want inherit.
     * @returns {*}
     */
    BytePushers.inherit = function (p) {
        var t;
        if (p === null) { // p must be non-null object
            throw new TypeError();
        }
        if (Object.create) {  // if Object.create() is defined...
            return Object.create(p);    // then just use it.
        }

        t = typeof p;  // Otherwise do some more type checking

        if (t !== "object" && t !== "function") {
            throw new TypeError();
        }

        function F() {// Define a dummy constructor function.
            return;
        }
        F.prototype = p;                // Set its prototype property to p.
        return new F();                 // Use f() to create an "heir" of p.
    };

    /**
     * defineClass() -- a utility function for defining JavaScript classes.
     *
     * This function expects a single object as its only argument.  It define
     * a new JavaScript class based on the data in that object and returns the
     * constructor function of the new class.  This function handles the repetitive
     * tasks of defining classes: setting up the prototype object for correct
     * inheritance, copying methods from other types, and so on.
     *
     * The object passed as an argument should have some or all of the
     * following properties:
     *
     *      name: the name of the class being defined.
     *            If specified, this value will be stored in the classname
     *            property of the prototype object.
     *
     *    extend: The constructor of the class to be extended.  If omitted,
     *            the Object() constructor will be used.  This value will
     *            be stored in the superclass property of the prototype object.
     *
     * construct: The constructor function for the class. If omitted, a new
     *            empty function will be used.  This value becomes the return
     *            value of the function, and is also stored in the constructor
     *            property of the prototype object.
     *
     *   methods: An object that specifies the instance methods (and other shared
     *            properties) for the class.  The properties of this object are
     *            copied into the prototype object of the class.  If omitted,
     *            an empty object is used instead.  Properties named
     *            "classname", "superclass", and "constructor" are reserved
     *            and should not be used in this object.
     *
     *   statics: An object that specifies the static methods (and other static
     *            properties) for the class.  The properties of this object become
     *            properties of the constructor function.  If omitted, an empty
     *            object is used instead.
     *
     *   borrows: A constructor function or array of constructor functions.
     *            The instance methods of each of the specified classes are copied
     *            into the prototype object of this new class so that the
     *            new class borrows the methods of each specified class.
     *            Constructors are processed in the order they are specified,
     *            so the methods of a class listed at the end of the array may
     *            overwrite the methods of those specified earlier. Note that
     *            borrowed methods are stored in the prototype object before
     *            the properties of the methods object above.  Therefore,
     *            methods specified in the methods object can overwrite borrowed
     *            methods. If this property is not specified, no methods are
     *            borrowed.
     *
     *  provides: A constructor function or array of constructor functions.
     *            After the prototype object is fully initialized, this function
     *            verifies that the prototype includes methods whose names and
     *            number of arguments match the instance methods defined by each
     *            of these classes.  No methods are copied; this is simply an
     *            assertion that this class "provides" the functionality of the
     *            specified classes.  If the assertion fails, this method will
     *            throw an exception.  If no exception is thrown, any
     *            instance of the new class can also be considered (using "duck
     *            typing") to be an instance of these other types.  If this
     *            property is not specified, no such verification is performed.
     **/
    BytePushers.defineClass = function (data) {
        // Extract the fields we'll use from the argument object.
        // Set up default values.
        var classname = data.name,
            Superclass = data.extend || Object,
            constructor = data.construct || function () {return; },
            methods = data.methods || {},
            statics = data.statics || {},
            borrows,
            provides,
            proto,
            i1,
            i2,
            c1,
            c2,
            p1,
            p2,
            p3,
            p4,
            p5;

        // Borrows may be a single constructor or an array of them.
        if (!data.borrows) {
            borrows = [];
        } else if (data.borrows instanceof Array) {
            borrows = data.borrows;
        } else {
            borrows = [ data.borrows ];
        }

        // Ditto for the provides property.
        if (!data.provides) {
            provides = [];
        } else if (data.provides instanceof Array) {
            provides = data.provides;
        } else {
            provides = [ data.provides ];
        }

        // Create the object that will become the prototype for our class.
        proto = new Superclass();

        // Delete any noninherited properties of this new prototype object.
        for (p1 in proto) {
            if (proto.hasOwnProperty(p1)) {
                delete proto[p1];
            }
        }

        // Borrow methods from "mixin" classes by copying to our prototype.
        for (i1 = 0; i1 < borrows.length; i1 = i1 + 1) {
            c1 = data.borrows[i1];
            borrows[i1] = c1;
            // Copy method properties from prototype of c to our prototype
            for (p2 in c1.prototype) {
                if (typeof c1.prototype[p2] === "function") {
                    proto[p2] = c1.prototype[p2];
                }
            }
        }

        // Copy instance methods to the prototype object
        // This may overwrite methods of the mixin classes
        for (p3 in methods) {
            if (methods.hasOwnProperty(p3)) {
                proto[p3] = methods[p3];
            }
        }

        // Set up the reserved "constructor", "superclass", and "classname"
        // properties of the prototype.
        proto.constructor = constructor;
        proto.Superclass = Superclass;
        // classname is set only if a name was actually specified.
        if (classname) {
            proto.classname = classname;
        }

        // Verify that our prototype provides all of the methods it is supposed to.
        for (i2 = 0; i2 < provides.length; i2 = i2 + 1) {  // for each class
            c2 = provides[i2];
            for (p4 in c2.prototype) {   // for each property
                if (typeof c2.prototype[p4] === "function" && (p4 === "constructor" || p4 === "superclass")) { //methods only
                    // Check that we have a method with the same name and that
                    // it has the same number of declared arguments.  If so, move on
                    if (proto.hasOwnProperty(p4) && typeof proto[p4] !== "function" && proto[p4].length !== c2.prototype[p4].length) {
                        // Otherwise, throw an exception
                        throw new Error("Class " + classname + " does not provide method " + c2.classname + "." + p4);
                    }
                }
            }
        }

        // Associate the prototype object with the constructor function
        constructor.prototype = proto;

        // Copy static properties to the constructor
        for (p5 in statics) {
            if (statics.hasOwnProperty(p5)) {
                constructor[p5] = statics[p5];
            }
        }

        // Finally, return the constructor function
        return constructor;
    };

    BytePushers.isArrayLike = function (x) {
        if (x instanceof Array) { // Real arrays are array-like
            return true;
        }
        if (!x.hasOwnProperty("length")) { // Arrays must have a length property
            return false;
        }
        if (typeof x.length !== "number") { // Length must be a number
            return false;
        }
        if (x.length < 0) { // and nonnegative
            return false;
        }
        if (x.length > 0) {
            // If the array is nonempty, it must at a minimum
            // have a property defined whose name is the number length-1
            if (!x.hasOwnProperty((x.length - 1))) {
                return false;
            }
        }
        return true;
    };

    // Return true if O has methods with the same name and arity as all
    // methods in I.prototype. Otherwise, return false.  Throws an exception
    // if I is a built-in type with nonenumerable methods.
    BytePushers.provides = function (O, I) {
        var proto = I.prototype,
            p6;
        // If O actually is an instance of I, it obviously looks like I
        if (O instanceof I) {
            return true;
        }

        // If a constructor was passed instead of an object, use its prototype
        if (typeof O === "function") {
            O = O.prototype;
        }

        // The methods of built-in types are not enumerable, and we return
        // undefined.  Otherwise any object would appear to provide any of
        // the built-in types.
        if (I === Array || I === Boolean || I === Date || I === Error || I === Function || I === Number || I === RegExp || I === String) {
            return undefined;
        }

        for (p6 in proto) {  // Loop through all properties in I.prototype
            // Ignore properties that are not functions
            if (typeof proto[p6] === "function") {
                // If O does not have a property by the same name return false
                if (!(O.hasOwnProperty(p6))) {
                    return false;
                }
                // If that property is not a function, return false
                if (typeof O[p6] !== "function") {
                    return false;
                }
                // If the two functions are not declared with the same number
                // of arguments return false.
                if (O[p6].length !== proto[p6].length) {
                    return false;
                }
            }
        }
        // If all the methods check out, we can finally return true.
        return true;
    };

    // This function creates a new enumerated type. The argument object specifies // the names and values of each instance of the class. The return value
    // is a constructor function that identifies the new class. Note, however
    // that the constructor throws an exception: you can't use it to create new
    // instances of the type. The returned constructor has properties that // map the name of a value to the value itself, and also a values array, // a foreach() iterator function
    BytePushers.enumeration = function (namesToValues) {
        // This is the dummy constructor function that will be the return value.
        var name,
            e,
            i3,
            enumeration = function () { throw "Can't Instantiate Enumerations"; },
            proto;

        enumeration.prototype = { // Enumerated values inherit from this object.
            constructor: enumeration, // Identify type
            toString: function () { return this.name; }, // Return name
            valueOf: function () { return this.value; }, // Return value
            toJSON: function () { return this.name; } // For serialization
        };
        proto = enumeration;
        enumeration.values = []; // An array of the enumerated value objects

        // Now create the instances of this new type.
        for (name in namesToValues) {        // For each value
            if (namesToValues.hasOwnProperty(name)) {
                e = BytePushers.inherit(proto); // Create an object to represent it
                Object.defineProperties(e, {
                    "name": {
                        value: null,
                        writable: true
                    },
                    "value": {
                        value: null,
                        writable: true
                    },
                    "abbreviation": {
                        value: null,
                        writable: true
                    },
                    "description": {
                        value: null,
                        writable: true
                    }
                });
                e.name = name;                  // Give it a name
                e.value = namesToValues[name].value;  // And a value
                e.abbreviation = namesToValues[name].abbreviation;  // And a abbreviation
                e.description = namesToValues[name].description;  // And a description
                enumeration[name] = e;          // Make it a property of constructor
                enumeration.values.push(e);     // And store in the values array
            }
        }

        // A class method for iterating the instances of the class
        enumeration.foreach = function (f, c) {
            for (i3 = 0; i3 < this.values.length; i3 = i3 + 1) {
                f.call(c, this.values[i3]);
            }
        };
        // Return the constructor that identifies the new type
        return enumeration;
    };

    module.exports = BytePushers;
}(window));
