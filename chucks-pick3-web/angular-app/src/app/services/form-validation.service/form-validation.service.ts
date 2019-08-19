import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  constructor() {
  }

/*ADD validateForm here!*/
public validateForm() {
return true;
}

  private hasData(input: string): boolean {
    let hasDataResult = false;
    const forms = document.getElementsByClassName('needs-validation');
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

  public isNameValid(input: string): boolean {
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
