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
      if (numChars.includes(numbers)) {
        numeric = true;
      } else {
        numeric = false;
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
      if (alphaChars.includes(character)) {
        alphabetical = true;

      } else {
        alphabetical = false;
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
      if (alphaChars.includes(character)) {
        lowercase = true;

      } else {
        lowercase = false;
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
      if (alphaChars.includes(character)) {
        uppercase = true;

      } else {
        uppercase = false;
        break;
      }
    }
    return uppercase;
  }

  public hasSpecialCharacters(input: string): boolean {
    let special = false;
    const specialChars = '!@#$%^&*()_+=-[]{}\"|/?.>,<';
    if (input !== null && input !== undefined) {
      for (const character of input) {
        if (specialChars.includes(character)) {
          special = true;

        } else {
          special = false;
          break;
        }
      }
    }
    return special;
  }

  public hasInvalidSpace(input: string): boolean {
    let spaceInvalid = false;
    const spaceChar = ' ';
    if (input !== null && input !== undefined) {
      if (spaceChar.includes(input)) {
        spaceInvalid = false;
      } else {
        spaceInvalid = true;
      }
    }
    return spaceInvalid;
  }


  private isAlphaNumeric(input: string): boolean {
    let alphaNumeric = false;
    const alphaChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for (const character of input) {
      if (alphaChars.includes(character)) {
        alphaNumeric = true;

      } else {
        alphaNumeric = false;
        break;
      }
    }
    return alphaNumeric;
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
      NameIsValid = this.isAlphaNumeric(input);
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
      const passwordCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+';
      for (const character of input) {
        if (passwordCharacters.includes(character)) {
          passwordIsValid = true;

        } else {
          passwordIsValid = false;
          break;
        }
      }
    }
    return passwordIsValid;
  }
}

