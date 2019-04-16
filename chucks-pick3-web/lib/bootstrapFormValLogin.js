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

// we created new function to group both checkFirstName and checkLastName then we changed error message
// to be more general for both by pulling normal case method then changed hasData function to a general name check name for validity ,
// then erase  checkFirstName and checkLastName function data and invoked checkedName function in both or just change oninput to checkName(this)


function submitForm() {
    const getUsernameInput = document.getElementById('defaultLoginFormUserName');
    console.log(getUsernameInput);
    const getPasswordInput = document.getElementById('defaultLoginFormPassword');
    checkUserName(getUsernameInput);
    checkPassword(getPasswordInput);
}

function checkUserName(input) {
    console.log(input);
    setErrorMessage(".invalid-feedback.username", "whats up", input);
    if (input !== null && input !== undefined) {

        if (input.required === true) { // the input is required if not show error message // must have required as a input field
            if (hasData(input)) { // input can not be null or undefined it will throw a error
                checkUserNameValidity(input);
            } else {
                setErrorMessage(".invalid-feedback." + input.name, input.name.toLowerCase() + " is required and can not be empty", input);
                console.log(setErrorMessage);
            }
        } else {
            if (hasData(input)) { // input can not be null or undefined it will throw a error
                checkUserNameValidity(input);
            }
        }
    }

}



//*********************LOGIN USERNAME & PASSWORD VALIDATION**************************


function checkUserName(input) { // create a function for first name // use input parameter
    checkedUserName(input);
}



//TODO: Must not be null or undefined or empty or contain whitespace
//TODO: Must include one capital letter
//TODO: Must include one lowercase letter
//TODO: Must inlcude one number
//TODO: Must include one special character
//TODO: May have to loop thru, may have to use search,contain or includes or match test all.

function checkPassword(input) {
    if (input !== null && input !== undefined) {
        setErrorMessage(".invalid-feedback." + input.name, "", input);

        if (input.validity.valid) { // use html 5 form validation error codes / use element.validity.valid
            // do nothing
        } else {
            // setErrorMessage
            setErrorMessage(".invalid-feedback." + input.name, input.validationMessage, input); //use setErrorMessage and add where the validation message displays in devtools and pull that message in setErrorMessage function
        }
        if (input !== input.value.toUpperCase()) {

        } else {
            setErrorMessage(".invalid-feedback." + input.name, input.validationMessage, input);

        }
        if (input !== input.toLowerCase()) {

        } else {
            setErrorMessage(".invalid-feedback." + input.name, input.validationMessage, input);

        }
        if (input.value === input.value.isNumeric()) {

        } else {
            setErrorMessage(".invalid-feedback." + input.name, input.validationMessage, input);

        }
        if (input.value.includes(input.value.toUpperCase)) {

        } else {
            setErrorMessage(".invalid-feedback." + input.name, input.validationMessage, input);


        }
        if (input.value.includes(input.value.toLowerCase)) {

        } else {
            setErrorMessage(".invalid-feedback." + input.name, input.validationMessage, input);

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


function checkUserNameValidity(input) {
    const errorFieldName = input.value.toNormalCase();
    const minLength = input.minLength; //create variable for min and max add to the input
    const maxLength = input.maxLength; //create variable for min and max add to the input

    if (minLength !== null && minLength !== undefined && maxLength !== null && maxLength !== undefined) {//  min can not be or equal null or undefined same as max
        // if statement for max length and min length make sure not null or undefined
        if (input.value.length >= minLength && input.value.length <= maxLength) { // if statement for min and max if greater or equal to and lesser or equal to
            if (input.value.isAlphanumeric() === false) {
                setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " can only contain alpha and numeric characters.", input);
            }
        } else if (input.value.length < minLength) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " must be greater than " + minLength + " characters.", input);
        } else if (input.value.length > maxLength) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " must be less than " + maxLength + " characters.", input);
        }
    } else if (minLength !== null && minLength !== undefined) {
        if (input.value.length >= minLength) {
            if (input.value.isAlphanumeric() === false) {
                setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " can only contain alpha characters.", input);
            }
        } else if (input.value.length < minLength) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " must be greater than " + minLength + " characters.", input);
        }
    } else if (maxLength !== null && maxLength !== undefined) {
        if (input.value.length <= maxLength) {
            if (input.value.isAlphanumeric() === false) {
                setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " can only contain alpha characters.", input);
            }
        } else if (input.value.length > maxLength) {
            setErrorMessage(".invalid-feedback." + input.name, errorFieldName + " must be less than " + maxLength + " characters.", input);
        }
    }

}






