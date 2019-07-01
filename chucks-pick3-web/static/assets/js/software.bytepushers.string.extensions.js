/**
 * Created by tonte on 10/4/17.
 */
/*global */
/* jshint -W108, -W109 */
/* jslint bitwise: true, unparam: true, regexp: true, this: true*/

(function () {
    'use strict';
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
     * <p>Function that is used to determine if a string includes a certain character or string.</p>
     * @function
     * @param <a href="http://www.w3schools.com/jsref/jsref_obj_string.asp">String</a> The string we are checking if is included.
     * @return <a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a> True of the string is included, otherwise false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    if (!String.prototype.match) {

        String.prototype.match = function (apples, oranges) {
            //return String.prototype.indexOf.apply(this, arguments) !== -1;
            return this.indexOf(apples, oranges) !== -1;
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
     *  <p> Function that is used to read only letters in a string.</p>
     *  @function
     *  @return <a href="https://www.w3schools.com/jsref/jsref_includes.asp ">Includes</a> Checks to see if a variable includes another variable.
     *  @author <a <a href="mailto:david.ocampo@bytepushers.software">David Ocampo</a>
     */

    if (!String.prototype.isAlphabetical) {

        String.prototype.isAlphabetical = function () {
            //return this.replace(/[0-9]/g, '').split('').sort().join('');
            var isAlphabetical = false;
            var trueAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
            //var i;

            // Note: the key word this represents the string that calls this isAlphabetical() method.
            // TODO: split the string into array and assign to a variable.
            var charactersArray = this.replace(/ /g,'').split('');
            // TODO: loop through the newly created array.
            for (var i=0; i < charactersArray.length; i++){
                // TODO: get each element out of newly created array
                var character = charactersArray[i];
                // TODO: determine if the true alphabet includes element.
                //if (this.includes(trueAlphabet[i])){
                if (trueAlphabet.includes(character)) { //TODO

                    console.log('Character "' + character + '" is an alphabet');
                    isAlphabetical = true;
                } else if (this !== trueAlphabet) {

                    console.log('Character "' + character + '" is not alphabet');
                    isAlphabetical = false;
                    break;
                }
            }
            return isAlphabetical;

        };
    }

    /**
     *  <p> Function that is used to read both letters and numbers in a string.</p>
     *  @function
     *  @return <a href="https://www.w3schools.com/jsref/jsref_includes.asp ">Includes</a> Checks to see if a variable includes another variable.
     *  @author <a <a href="mailto:david.ocampo@bytepushers.software">David Ocampo</a>
     */

    if (!String.prototype.isAlphanumeric) {

        String.prototype.isAlphanumeric = function () {
            //return this.replace(/[0-9]/g, '').split('').sort().join('');
            var isAlphanumeric = false;
            var trueAlphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
            //var i;

            // Note: the key word this represents the string that calls this isAlphabetical() method.
            // TODO: split the string into array and assign to a variable.
            var charactersArray = this.replace(/ /g,'').split('');
            // TODO: loop through the newly created array.
           for (var i=0; i < charactersArray.length; i++){
                // TODO: get each element out of newly created array
                var character = charactersArray[i];
                // TODO: determine if the true alphabet includes element.
                //if (this.includes(trueAlphabet[i])){
                if (trueAlphanumeric.includes(character)) { //TODO

                    console.log('Character "' + character + '" is alphanumeric');
                    isAlphanumeric = true;
                } else if (this !== trueAlphanumeric) {

                    console.log('Character "' + character + '" is not alphanumeric');
                    isAlphanumeric = false;
                    break;
                }
            }
            return isAlphanumeric;

        };
    }
    /**
     * <p>Function that is used to turn a string that is in camel case format to a Normal sentence format. (e.g. helloWorld => Hello World)</p>
     * @function
     * @return <a href="http://www.w3schools.com/jsref/jsref_obj_string.asp">String</a> The value of the string after it has been formatted to a normal sentence format.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
        String.prototype.toNormalCase = function () {
        return this.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z])/g, '$1 $2').replace(/^./, function (str) {
            return str.toUpperCase();
        });
    };




    /**
     * <p>Convenience function that will format a string with dynamic variables.</p>
     * @static
     * @param {...string} string - first argument is the string template to be formatted. The remaining arguments will be dynamically injected into template variable placeholders.(e.g. "{0}")
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
         * Convenience method that returns the sub-string found before the search criteria.
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
}());