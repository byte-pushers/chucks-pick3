import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NumberUtilityService {
  public padLeft(digit, length) {
    if (digit === undefined || digit === null) {
      digit = '';
    }

    if (digit.length >= length) {
      return digit;
    }

    return this.padLeft('0' + digit, length);
  }

  public padRight = function padRight(digit, length) {
    if (digit === undefined || digit === null) {
      digit = '';
    }

    if (digit.length >= length) {
      return digit;
    }

    return padRight(digit + '0', length);
  };

  public isSingleDigit(digit) {
    if (0 < digit && digit <= 9) {
      return true;
    }

    return false;
  }

  public isNotANumber(d) {
    return isNaN(d);
  }

  public isANumber(d) {
    if (d === '') {
      return false;
    }
    return !isNaN(d);
  }
}
