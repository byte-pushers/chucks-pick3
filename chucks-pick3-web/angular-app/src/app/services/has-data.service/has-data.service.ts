import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HasDataService {

  constructor() { }
}

/*private checkData(firstName): void {  // create a function for first name // use input parameter
  let datacheck: boolean = this.checkFirstNameService.hasData(firstName);

  if (firstName == true) {

  }

  return firstNameIsValid;
}
}*/

/*
function hasData(input) {
  let hasDataResult = false;

  if (input.value !== null && input.value !== undefined) { // input can not be null or undefined it will throw a error
    input.value = input.value.trim(); // trim whitespace for input
    if (input.value.isEmpty() !== true) { //make sure input is not empty value
      hasDataResult = true;
    }
  }

  return hasDataResult;
}*/
