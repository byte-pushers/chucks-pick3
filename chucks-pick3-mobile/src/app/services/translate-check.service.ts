import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {toTitleCase} from 'codelyzer/util/utils';

@Injectable({
  providedIn: 'root'
})
export class TranslateCheckService {
  setLang: string;
  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
    this.setLang = 'en';
  }

  public setLanguage(lang) {
    console.log(lang);
    this.setLang = lang;
  }

  checkLang(): boolean {
    // TODO: Checks language setting if its in english (true) or spanish (false)
    if (this.setLang === 'en') {
      return true;
// TODO: Setting will return true to grab appropriate string
    } else {
      return false;
    }

  }

  collectValues(values) {
    console.log(values);
  }
/*  public switchLang(lang) {
    // TODO: Could become a switch with future languages being added
    if (lang === 'en') {
      lang = Pick3DrawTimeEnum.toString(Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING);
      return lang;
    } else {
      // TODO: Spanish setting will be placed here if returns false
      lang = Pick3DrawTimeEnum.toString(Pick3DrawTimeEnum.Pick3DrawTimeEnum.MANANA);
      return lang;
    }
  }*/
}
