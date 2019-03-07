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
     * <p>Convenience function that will return true if string is empty.</p>
     * @static
     * @param {...string} string -  Function that measures if your string contains characters or not
     * @function
     * @return <a href="https://www.w3schools.com/jsref/jsref_length_string.asp>String</a> The length property returns the length of a string (number of characters).
     The length of an empty string is 0..
     * @author <a href="mailto:anthony.gamble@bytepushers.sotfware.com">Anthony; Gamble</a>
     */

    String.prototype.isEmpty = function () {
        //return this.toString().length === 0 || /^\s*$/.test();
        var isEmptyString = false;
        //TODO: Check if isEmptyString contains only whitespace, if that is the case set isEmptyString value to true
        var trimmedString = this.trim();


        //TODO: Check length if length is 0 then string is empty, if that's the case set isEmptyString value to true
        if (trimmedString.length === 0) {
            isEmptyString = true;
        }
        return isEmptyString;
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
     * <p>Convenience function that will return true if string includes numbers.</p>
     * @static
     * @param {...string} string -  Function that measures if your string contains integers or not
     * @function
     * @return <a href="https://www.w3schools.com/jsref/jsref_length_string.asp>String</a> The loop thru string check for numbers return first occurrence string (number of characters).
     The length of an empty string is 0..
     * @author <a href="mailto:anthony.gamble@bytepushers.sotfware.com">Anthony; Gamble</a>
     */


    function isNumeric(str) {
                ///var that split
                 //made array

                 str = str.split("");

                 for (i = 0; i < str.length; i++) {
                     if (!isNaN(parseInt(str[i]))) {
                        return true
                     }
                 }
                return false;
             }

             isNumeric("what what no numbers in this string 1223");
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
































/*function vaiidate() {

    var formContent = document.getElementById("formContent");
    var fName = document.getElementById("fName").value;

    if (fName === "" ) {
        formContent.innerHTML = "Please fill in all required field";
    } else if (fName.lenght < 3) {
        formContent.innerHTML = "Your name is to short";
    }


}

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var formContent = document.getElementsByClassName('formContent');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
// perform this operation on button click

$("#MyBtn").click(function(){

  // create and set a variable to keep count of the elements that have a value
  var count = 0;

  // count how many input elements are on page (makes it dynamic)
  var inputCount = $("#input-container input").length;

  // loop through each of the input elements
  $("#input-container input").each(function(index, item){

    // if 'item' doesn't have value add 1 to 'count'
    if(item.value === "")
    	count = count + 1;

  });

  // if count is less than how many inputs are on form then at least one input has a value... else none of the inputs have a value

  // here is where you could put a required field on one of the fields or whatever


/*<script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();



var myTextbox = document.getElementById('my-textbox');
myTextbox.addEventListener('keypress', checkName, isEmpty, isAlphaNumeric, false);
function checkName(evt) {
  var charCode = evt.charCode;
  if (charCode != 0) {
    if (charCode < 97 || charCode > 122) {
      evt.preventDefault();
      displayWarning(
        "Please use lowercase letters only."
        + "\n" + "charCode: " + charCode + "\n"
      );
    }
  }
}
function isEmpty(evt) {
  var emptyInput = evt.length;
  if (length != 0) {
    if (length < 3 || length > 122) {
      evt.preventDefault();
      displayWarning(
        "Please add more letters."

      );
    }
  }
}
var warningTimeout;
var warningBox = document.createElement("div");
warningBox.className = "warning";

function displayWarning(msg) {
  warningBox.innerHTML = msg;

  if (document.body.contains(warningBox)) {
    window.clearTimeout(warningTimeout);
  } else {
    // insert warningBox after myTextbox
    myTextbox.parentNode.insertBefore(warningBox, myTextbox.nextSibling);
  }

  warningTimeout = window.setTimeout(function() {
      warningBox.parentNode.removeChild(warningBox);
      warningTimeout = -1;
    }, 2000);
}
*/
