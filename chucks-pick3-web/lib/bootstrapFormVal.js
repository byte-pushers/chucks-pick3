
(function () {
    'use strict';


    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

}());



function checkFirstName(input) { // create a function for first name // use input parameter

    if (input !== null && input !== undefined) {
        setErrorMessage(".invalid-feedback." + input.name, "", input);

        if (input.required === true) { // the input is required if not show error message // must have required as a input field
            if (hasData(input)) { // input can not be null or undefined it will throw a error
                checkFirstNameValidity(input);
            } else {
                setErrorMessage(".invalid-feedback." + input.name, "First Name is required and can not be empty", input);
            }
        } else {
            if (hasData(input)) { // input can not be null or undefined it will throw a error
                checkFirstNameValidity(input);
            }
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
//function setErrorMessage(e,t,r){document.querySelector(e).innerHTML=t,r.setCustomValidity(t)}

function setErrorMessage(querySelector, errorMessage, input) { //function named setErrorMessage with a parameter of query, error and input The set syntax binds an object property to a function to be called when there is an attempt to set that property.
    document.querySelector(querySelector).innerHTML = errorMessage;
    input.setCustomValidity(errorMessage);

}


function checkFirstNameValidity(input) {
    const minLength = input.minLength; //create variable for min and max add to the input
    const maxLength = input.maxLength; //create variable for min and max add to the input

    if (minLength !== null && minLength !== undefined && maxLength !== null && maxLength !== undefined) {//  min can not be or equal null or undefined same as max
        // if statement for max length and min length make sure not null or undefined
        if (input.value.length >= minLength && input.value.length <= maxLength) { // if statement for min and max if greater or equal to and lesser or equal to
            if (input.value.isAlphabetical() === false) {
                setErrorMessage(".invalid-feedback." + input.name, "First Name can only contain alpha characters.", input);
            }
        } else if (input.value.length < minLength) {
            setErrorMessage(".invalid-feedback." + input.name, "First Name must be greater than " + minLength + " characters.", input);
        } else if (input.value.length > maxLength) {
            setErrorMessage(".invalid-feedback." + input.name, "First Name must be less than " + maxLength + " characters.", input);
        }
    } else if (minLength !== null && minLength !== undefined) {
        if (input.value.length >= minLength) {
            if (input.value.isAlphabetical() === false) {
                setErrorMessage(".invalid-feedback." + input.name, "First Name can only contain alpha characters.", input);
            }
        } else if (input.value.length < minLength) {
            setErrorMessage(".invalid-feedback." + input.name, "First Name must be greater than " + minLength + " characters.", input);
        }
    } else if (maxLength !== null && maxLength !== undefined) {
        if (input.value.length <= maxLength) {
            if (input.value.isAlphabetical() === false) {
                setErrorMessage(".invalid-feedback." + input.name, "First Name can only contain alpha characters.", input);
            }
        } else if (input.value.length > maxLength) {
            setErrorMessage(".invalid-feedback." + input.name, "First Name must be less than " + maxLength + " characters.", input);
        }
    }
}


