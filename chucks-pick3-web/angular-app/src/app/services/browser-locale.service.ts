import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserLocaleService {
  constructor(public translate: TranslateService) {
  }

  public findLanguage() {
    let passedLanguage;
    const recievedLanguage = navigator.language;
    if (recievedLanguage.includes('es')) {
      passedLanguage = 'es';
    } else {
      passedLanguage = 'en';
    }
    return passedLanguage;
  }

  public switchLanguage(passedLanguage) {
    this.translate.use(passedLanguage);
  }

}
