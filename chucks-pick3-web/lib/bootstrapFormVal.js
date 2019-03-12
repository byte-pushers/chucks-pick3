
/**
 * Created by tonte on 10/4/17.
 */
/*global */
/* jshint -W108, -W109 */
/* jslint bitwise: true, unparam: true, regexp: true, this: true*/

(function () {
    'use strict';
//TODO: Add default bootstrap 4 form validation ***DONE***
//TODO: How to link window.addEventListener first ***DONE***
//TODO: How to link function to form to see if it works ***DONE***
//TODO: Where to add console.log to test ***DONE**
//TODO: Run test on first name for empty, numeric, alphanumeric, whitespace, copy and paste.
//TODO: Run test on last name for empty, numeric, alphanumeric, whitespace, copy and paste.
//TODO: Figure out how to add error messages for first name


    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {

                var fName3 = document.getElementById("defaultRegisterFormFirstName").innerHTML = "please enter your first name";
                if (fName3.isEmpty() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                var fName2 = document.getElementById("defaultRegisterFormFirstName").value;
                if (fName2.isNumeric() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                /*if (!fName2.isAlphabetical() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }*/
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                /*var isValidNameAlpNum = fName2.isAlphanumeric();
                console.log('isValidNameAlpNum', isValidNameAlpNum);
                //TODO: I want to display error message if not alphanumeric
                document.querySelector('#name-error').style.display = 'block';
                if (!fName2) {
                    return 'block';
                } else if (!fName2)
                {
                    return 'none';
                }
                //TODO: I want to display correct message if alphabet
                document.querySelector('#name-correct').style.display = 'none';
                if (fName2) {
                    return 'block';
                } else if (fName2)
                {
                    return 'none';
                }*/

                var isValidName = fName3.isAlphanumeric();

                console.log('isValidName', isValidName);

                document.querySelector('#name-error').style.display = (!isValidName

                    ? 'none'
                    : 'none');



                document.querySelector('#name-correct').style.display = (isValidName

                    ? 'none'
                    : 'block');

                /*var isValidNameAlpha = fName3.isAlphabetical();
                console.log('isValidNameAlpha', isValidNameAlpha);
                //TODO: I want to display error message if not alphabet
                document.querySelector('#name-error-AlphaNum').style.display = 'block';

                if (!fName3.isAlphabetical()) {
                    return 'block';

                } else if (!fName3.isAlphabetical())
                {
                    return 'none';
                }
                //TODO: I want to display correct message if alphabet
                document.querySelector('#name-correct').style.display = 'none';
                if (fName2) {
                    return 'none';
                } else if (fName2)
                {
                    return'block'
                }*/
                /*var isValidNameNumeric = fName2.isNumeric();
                console.log('isValidNameNumeric', isValidNameNumeric);
                //TODO: I want to display error message if input includes numbers
                document.querySelector('#name-error-numeric').style.display = 'block';
                if (!fName2) {
                    return 'block';
                } else if (!fName2)
                {
                    return document.querySelector('#name-correct').style.display = 'block';
                }
                //TODO: I want to display correct message does not include numbers
                document.querySelector('#name-correct').style.display = 'block';
                if (fName2) {
                    return 'block';
                } else if (fName2)
                {
                    return document.querySelector('#name-error-numeric').style.display = 'block';
                }*/
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
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
     * @return <a href="http://www.w3schools.com                                                                                                                                                                                                                                /jsref/jsref_obj_boolean.asp">Boolean</a> True of the string is included, otherwise false.
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
     * <p>Convenience function that will return true if string is empty.</p>
     * @static
     * @param {...string} string -  Function that measures if your string contains characters or not
     * @function
     * @return <a href="https://www.w3schools.com/jsref/jsref_length_string.asp>String</a> The length property returns the length of a string (number of characters).
     The length of an empty string is 0..
     * @author <a href="mailto:anthony.gamble@bytepushers.sotfware.com">Anthony; Gamble</a>
     */
    if(!String.prototype.isEmpty){

        String.prototype.isEmpty = function () {


            //return this.toString().length === 0 || /^\s*$/.test();
            var isEmptyString = false;
            //TODO: Check if isEmptyString contains only whitespace, if that is the case set isEmptyString value to true
            var trimmedString = this.trim();


            //TODO: Check length if length is 0 then string is empty, if that's the case set isEmptyString value to true
            if (trimmedString.length === 0) {

//                 alert("Please Fill All Required Field");
                /*document.getElementById("firstNameError").innerHTML = "You must enter a first name";*/
                console.log('trimmedString "' + trimmedString + '" is empty');
                isEmptyString = true;

            }
            /*if(!isEmpty.includes(trimmedString)) {
                isEmpty = false;
                console.log('invalid input');
            }*/
            return isEmptyString;
        };
    }

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

                }
                if (this !== trueAlphabet) {

                    console.log('Character "' + character + '" is not alphabet');
                    isAlphabetical = false;
                    break;
                }

                /*if(!trueAlphabet.includes(character)) {
                    isAlphabetical = false;
                    console.log('invalid input');
                    break;
                }*/
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


    String.prototype.isAlphanumeric = function () {
        //return this.replace(/[0-9]/g, '').split('').sort().join('');
        var isAlphanumeric = true;
        var trueAlphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456".split('');
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

            /*if (trueAlphanumeric.includes(character)) { //TODO

                alert("Please only use letters");
                console.log('Character "' + character + '" is alphanumeric');
                isAlphanumeric = true;
            } else if (this !== trueAlphanumeric) {

                console.log('Character "' + character + '" is not alphanumeric');
                isAlphanumeric = false;
                break;
            }*/

            if(!trueAlphanumeric.includes(character)) {
                isAlphanumeric = false;
                console.log('invalid input');
                break;
            }
        }

        return isAlphanumeric;
    };

    /**
     * <p>Convenience function that will return true if string includes numbers.</p>
     * @static
     * @param {...string} string -  Function that measures if your string contains integers or not
     * @function
     * @return <a href="https://www.w3schools.com/jsref/jsref_length_string.asp>String</a> The loop thru string check for numbers return first occurrence string (number of characters).
     The length of an empty string is 0..
     * @author <a href="mailto:anthony.gamble@bytepushers.sotfware.com">Anthony; Gamble</a>
     */
    if (!String.prototype.isNumeric) {

        String.prototype.isNumeric = function () {
            //return this.replace(/[0-9]/g, '').split('').sort().join('');
            var isNumeric = false;
            var trueNumeric = '0123456789'.split('');
            //var i;

            // Note: the key word this represents the string that calls this isAlphabetical() method.
            // TODO: split the string into array and assign to a variable.
            var numbersArray = this.replace(/ /g,'').split('');
            // TODO: loop through the newly created array.
            for (var i=0; i < numbersArray.length; i++){
                // TODO: get each element out of newly created array
                var numBer = numbersArray[i];
                // TODO: determine if the true alphabet includes element.
                //if (this.includes(trueNumeric[i])){
                /*if (trueNumeric.includes(numBer)) { //TODO

                    // alert("Please do not include numbers");
                    console.log('NumBer "' + numBer + '" is an number');
                    isNumeric = true;

                } else if (this !== trueNumeric) {

                    console.log('Character "' + numBer + '" is not number');
                    isNumeric = false;
                    break;
                }*/
                /*if(!trueNumeric.includes(numBer)) {
                    isNumeric = false;
                    console.log('invalid input');
                    break;
                }*/
            }
            return isNumeric;

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