(function () {
    'use strict';


    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                var formElements = form.elements;
                for (var i = 0; i < formElements.length; i++) {
                    var aElement = formElements[i];
                    if (aElement.name === "userName"  ) {
                        checkUserName(aElement);

                    }
                    if (aElement.name === "passWord") {
                        checkPassWord(aElement);

                    }

                }

                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

}());



<<<<<<< HEAD

function checkPassWord(input) {
=======
function checkedUserName(input) {
>>>>>>> 889aa67190330482f559c395c9a4a39b72cb8007
    if (input !== null && input !== undefined) {
        setErrorMessage(".invalid-feedback." + input.name, "", input);

        if (input.required === true) { // the input is required if not show error message // must have required as a input field
            if (hasData(input)) { // input can not be null or undefined it will throw a error
                checkPassValidity(input);
            } else {
                setErrorMessage(".invalid-feedback." + input.name, input.name.toNormalCase() + " is required and can not be empty", input);
            }
        } else {
            if (hasData(input)) { // input can not be null or undefined it will throw a error
                checkPassValidity(input);
            }
        }
    }



<<<<<<< HEAD
    function checkPassValidity(input) {
        const errorFieldName = input.value.toNormalCase();
        var PasswordContainsUpperCase = /[A-Z]/g;//test for uppercase letter
        var PasswordContainsLowerCase = /[a-z]/g; //test for lowercase letter
        var PasswordContainsNumber = /[0-9]/g; //test for number
        var PasswordContainsSpecialChar = /\W/g; //test for special character
=======
}

>>>>>>> 889aa67190330482f559c395c9a4a39b72cb8007

        if(!input.value.match(PasswordContainsUpperCase)) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Password must contain a Uppercase letter", input);
            return false;
        }
        if(!input.value.match(PasswordContainsNumber)) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Password must contain a number", input);
            return false;

<<<<<<< HEAD
        }
        if(!input.value.match(PasswordContainsLowerCase)) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Password must contain a lowercase character", input);
            return false;
        }
        if(!input.value.match(PasswordContainsSpecialChar)) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Password must contain a special character", input);
            return false;
        }
        if (!input.value.length >= 8) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Password must contain 8 characters", input);
            return false;
        }
}

=======
>>>>>>> 889aa67190330482f559c395c9a4a39b72cb8007

function checkUserName(input) {

<<<<<<< HEAD
    if (input !== null && input !== undefined) {
        setErrorMessage(".invalid-feedback." + input.name, "", input);

        if (input.validity.valid) { // use html 5 form validation error codes / use element.validity.valid
            // do nothing
        } else {
            // setErrorMessage
            setErrorMessage(".invalid-feedback." + input.name, input.validationMessage, input); //use setErrorMessage and add where the validation message displays in devtools and pull that message in setErrorMessage function
        }
    }



}


/*function checkUserNameValidity(input) {
    const errorFieldName = input.value.toNormalCase();


    if (!input.value.length >= 4) {
        console.log(input.value.length);
        setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Password must contain 4 characters", input);
        return false;
    }
}*/
=======
//TODO: Must not be null or undefined or empty or contain whitespace
//TODO: Must include one capital letter
//TODO: Must include one lowercase letter
//TODO: Must include one number
//TODO: Must include one special character
//TODO: May have to loop thru, may have to use search,contain or includes or match test all.

function checkPassword(input) {
    hasData(input);



    const errorFieldName = input.value.toNormalCase();
    const minLength = input.minLength; //create variable for min and max add to the input
    const maxLength = input.maxLength; //create variable for min and max add to the input


    if (minLength !== null && minLength !== undefined && maxLength !== null && maxLength !== undefined) {//  min can not be or equal null or undefined same as max
        // if statement for max length and min length make sure not null or undefined
        if (input.value.length >= minLength && input.value.length <= maxLength) { // if statement for min and max if greater or equal to and lesser or equal to
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Must contain characters.", input);
        } else if (input.value.length < minLength) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " must be greater than " + minLength + " characters.", input);
        } else if (input.value.length > maxLength) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " must be less than " + maxLength + " characters.", input);
        }
    } else if (minLength !== null && minLength !== undefined) {
        if (input.value.length >= minLength) {

    } else if (input.value.length < minLength) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " must be greater than " + minLength + " characters.", input);
        }
        } else if (maxLength !== null && maxLength !== undefined) {
        if (input.value.length <= maxLength) {
        } else if (input.value.length > maxLength) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " must be less than " + maxLength + " characters.", input);
        }
    }

}
>>>>>>> 889aa67190330482f559c395c9a4a39b72cb8007


function hasData(input) {
    let hasDataResult = false;

    if (input.value !== null && input.value !== undefined) { // input can not be null or undefined it will throw a error
        input.value = input.value.trim(); // trim whitespace for input
        if (input.value.isEmpty() !== true) { //make sure input is not empty value
            hasDataResult = true;
        }
    }

    return hasDataResult;
}


function setErrorMessage(querySelector, errorMessage, input) { //function named setErrorMessage with a parameter of query, error and input The set syntax binds an object property to a function to be called when there is an attempt to set that property.
    document.querySelector(querySelector).innerHTML = errorMessage;
    input.setCustomValidity(errorMessage);

}


