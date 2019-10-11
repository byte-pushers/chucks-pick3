import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserLocaleService {
  constructor(public translate: TranslateService) {
  }

  public getLanguage() {
    let browserLanguage;
    if (navigator.language.includes('es')) {
      browserLanguage = 'es';
    } else {
      browserLanguage = 'en';
    }
    return browserLanguage;
  }

  public switchLanguage(passedLanguage) {
    this.translate.use(passedLanguage);
  }

}
