

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
                    if (aElement.name === "userName") {
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


function checkPassWord(input) {
    if (input !== null && input !== undefined) {
        setErrorMessage(".invalid-feedback." + input.name, "", input);

        if (input.required === true) { // the input is required if not show error message // must have required as a input field
            if (hasData(input)) { // input can not be null or undefined it will throw a error
                checkPassValidity(input);
            } else {
                setErrorMessage(".invalid-feedback."+ input.name,input.name.toNormalCase() +" is required and can not be empty " ,input);
            }
        } else {
            if (hasData(input)) { // input can not be null or undefined it will throw a error
                checkPassValidity(input);
            }
        }
    }
}
function checkPassValidity(input) {
    const errorFieldName = input.value.toNormalCase();
    var passwordContainsUpperCase = /[A-Z]/g;//test for uppercase letter
    var passwordContainsLowerCase = /[a-z]/g; //test for lowercase letter
    var passwordContainsNumber = /[0-9]/g; //test for number
    var passwordContainsSpecialChar = /\W/g; //test for special character

    if (!input.value.match(passwordContainsUpperCase)) {
        setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Password must contain a Uppercase letter", input);
        return false;
    }
    if (!input.value.match(passwordContainsNumber)) {
        setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Password must contain a number", input);
        return false;
    }
    if (!input.value.match(passwordContainsLowerCase)) {
        setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Password must contain a lowercase character", input);
        return false;
    }
    if (!input.value.match(passwordContainsSpecialChar)) {
        setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Password must contain a special character", input);
        return false;
    }
    if (!input.value.length >= 8) {
        setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " Password must contain 8 characters", input);
        return false;
    }
}

function checkUserName(input) {

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
