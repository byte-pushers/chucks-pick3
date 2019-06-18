import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFirstNameService {
  constructor() {
  }

  private hasData(input: string): boolean {  // create a function for first name // use input parameter
    let hasDataResult = false;

    if (input !== null && input !== undefined) { // input can not be null or undefined it will throw a error
      input = input.trim(); // trim whitespace for input
      if (input.length > 0) { // make sure input is not empty value
        hasDataResult = true;
      }
    }

    return hasDataResult;
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

  public isFirstNameValid(firstName: string): boolean { // create a function for first name // use input parameter
    let firstNameIsValid = false;

    if (this.hasData(firstName)) {
      firstNameIsValid = this.isAlphabetical(firstName);
    }

    return firstNameIsValid;
  }
}
