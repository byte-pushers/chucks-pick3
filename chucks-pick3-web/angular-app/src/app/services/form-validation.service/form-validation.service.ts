import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  constructor() {
  }
public minLength(input: string): boolean {
  let minLength = false;
  if (input !== null && input !== undefined) {
    input = input.trim();
    if (input.length >= 2) {
      minLength = true;
    }
  }
  return minLength;
}
  public zipMinLength(input: string): boolean {
    let zipMinLength = false;
    if (input !== null && input !== undefined) {
      input = input.trim();
      if (input.length >= 4 && input.length <= 5) {
        zipMinLength = true;
      }
    }
    return zipMinLength;
  }
  public phoneMinLength(input: string): boolean {
    let phoneMinLength = false;
    if (input !== null && input !== undefined) {
      input = input.trim();
      if (input.length >= 9 && input.length <= 11) {
        phoneMinLength = true;
      }
    }
    return phoneMinLength;
  }

  public hasData(input: string): boolean {  // create a function for first name // use input parameter
    let hasDataResult = false;

    if (input !== null && input !== undefined) { // input can not be null or undefined it will throw a error
      input = input.trim(); // trim whitespace for input
      if (input.length > 0) { // make sure input is not empty value
        hasDataResult = true;
      }
    }

    return hasDataResult;
  }
private isNumeric(input: string): boolean {
    let numeric = false;
    const numChars = '0123456789'.split('');
    const numArray = input.replace(/ /g, '').split('');
    for (const numbers of numArray) {
      console.log(numbers);
      if (numChars.includes(numbers)) {
        numeric = true;
      } else {
        numeric = false;
        console.log('character not valid');
        break;
      }
    }
    return numeric;
}
  private isAlphabetical(input: string): boolean {
    let alphabetical = false;
    const alphaChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const charactersArray = input.replace(/ /g, '').split('');
    for (const character of charactersArray) {
      console.log(character);
      if (alphaChars.includes(character)) {
        alphabetical = true;
        // console.log (' a-okay!');
      } else {
        alphabetical = false;
        console.log('character not valid');
        break;
      }
    }
    /*for (let i = 0; i < charactersArray.length; i++) {
      const character = charactersArray[i];
      if (alphaChars.includes(character)) {
        alphabetical = true;
        // console.log (' a-okay!');
      } else {
        alphabetical = false;
        console.log('character not valid');
        break;
      }
    }*/


    return alphabetical;
  }

  public isNameValid(input: string): boolean { // create a function for first name // use input parameter
    let NameIsValid = false;

    if (this.hasData(input)) {
      NameIsValid = this.isAlphabetical(input);
    }

    return NameIsValid;
  }
  public isPhoneNumberValid(input: string): boolean {
    let NumberisValid = false;
    if (this.hasData(input)) {
      NumberisValid = this.isNumeric(input);
    }
    return NumberisValid;
  }
}
