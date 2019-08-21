import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  constructor() {
  }


  private hasData(input: string): boolean {
    let hasDataResult = false;

    if (input !== null && input !== undefined) {
      input = input.trim();
      if (input.length > 0) {
        hasDataResult = true;
      }
    }
    return hasDataResult;
  }

  private isNumeric(input: string): boolean {
    let numeric = false;
    const numChars = '0123456789-'.split('');
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

      } else {
        alphabetical = false;
        console.log('character not valid');
        break;
      }
    }
    return alphabetical;
  }
  public isSpaceInvalid(input: string): boolean {
    let alphabetical = false;
    const alphaChars = ' ';
    const charactersArray = input.replace(/ a-z, A-Z, 1-9/g, '').split('');
    for (const character of charactersArray) {
      console.log(character);
      if (alphaChars.includes(character)) {
        alphabetical = false;

      } else {
        alphabetical = true;
        console.log('There is a space');
        break;
      }
    }
    return alphabetical;
  }
  private isAlphanumeric(input: string): boolean {
    let alphanumeric = false;
    const alphaChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const charactersArray = input.replace(/ /g, '').split('');
    for (const character of charactersArray) {
      console.log(character);
      if (alphaChars.includes(character)) {
        alphanumeric = true;

      } else {
        alphanumeric = false;
        console.log('character not valid');
        break;
      }
    }
    return alphanumeric;
  }

  public isNameValid(input: string): boolean {
    let NameIsValid = false;

    if (this.hasData(input)) {
      NameIsValid = this.isAlphabetical(input);
    }

    return NameIsValid;
  }
  public isUsernameValid(input: string): boolean {
    let NameIsValid = false;

    if (this.hasData(input)) {
      NameIsValid = this.isAlphanumeric(input);
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
