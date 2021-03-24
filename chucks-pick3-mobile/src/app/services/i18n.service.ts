import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  setLang: string;
  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
    this.setLang = 'en';
  }

  public setLanguage(lang) {
    this.setLang = lang;
  }
}
