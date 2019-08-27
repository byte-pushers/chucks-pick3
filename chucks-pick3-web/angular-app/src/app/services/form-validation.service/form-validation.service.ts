import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  constructor() {
  }

  public validateForm(): boolean {
    return true;
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

  public isLowercase(input: string): boolean {
    let lowercase = false;
    const alphaChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const charactersArray = input.split('');
    for (const character of charactersArray) {
      console.log(character);
      if (alphaChars.includes(character)) {
        lowercase = true;

      } else {
        lowercase = false;
        console.log('character not valid');
        break;
      }
    }
    return lowercase;
  }

  public isUppercase(input: string): boolean {
    let uppercase = false;
    const alphaChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const charactersArray = input.split('');
    for (const character of charactersArray) {
      console.log(character);
      if (alphaChars.includes(character)) {
        uppercase = true;

      } else {
        uppercase = false;
        console.log('character not valid');
        break;
      }
    }
    return uppercase;
  }

  public containsSpecialChars(input: string): boolean {
    let special = false;
    const specialChars = '!@#$%^&*()_+=-[]{}\"|/?.>,<';
    if (input === null || input === undefined) {
      return null;
    } else {
      for (const character of input) {
        console.log(character);
        if (specialChars.includes(character)) {
          special = true;

        } else {
          special = false;
          console.log('character not valid');
          break;
        }
      }
      return special;
    }
  }

  public hasInvalidSpace(input: string): boolean {
    let spaceInvalid = false;
    const spaceChar = ' ';
    if (input === null || input === undefined) {
      return null;
    } else {
      for (const character of input) {
        console.log(character);
        if (character.includes(spaceChar)) {
          spaceInvalid = false;

          console.log('There is a space');
        } else {
          spaceInvalid = true;
          break;
        }
      }
    }
    return spaceInvalid;
  }
private isSpecialAlphanumeric(input: string): boolean {
  let specialAlphanumeric = false;
  const specialAlphaChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-=_+'.split('');
  for (const character of input) {
    console.log(character);
    if (specialAlphaChars.includes(character)) {
      specialAlphanumeric = true;

    } else {
      specialAlphanumeric = false;
      console.log('character not valid');
      break;
    }
    return specialAlphanumeric;
  }
  }
  private isAlphanumeric(input: string): boolean {
    let alphanumeric = false;
    const alphaChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const charactersArray = input;
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
    let nameIsValid = false;

    if (this.hasData(input)) {
      nameIsValid = this.isAlphabetical(input);
    }

    return nameIsValid;
  }

  public isUserNameValid(input: string): boolean {
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

  public isPasswordValid(input: string) {
    let passwordIsValid = false;
    if (this.hasData(input)) {
      passwordIsValid = this.isSpecialAlphanumeric(input);
    }
    return passwordIsValid;
  }
}
