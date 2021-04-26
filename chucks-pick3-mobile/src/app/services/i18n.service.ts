import {EventEmitter, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  setLang: string;
  langUpdated: EventEmitter<any> = new EventEmitter();
  constructor(public translateService: TranslateService) {
    translateService.setDefaultLang('en-US');
    this.setLang = 'en-US';
  }

  public setLanguage(lang) {
    this.setLang = lang;
    this.langUpdated.emit(this.setLang);
  }

  getLang() {
    return this.setLang;
  }
}
