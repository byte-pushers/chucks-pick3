import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class I18nService {
    setLang: string;

    constructor(public translateService: TranslateService) {
        translateService.setDefaultLang('en-US');
        this.setLang = 'en-US';
    }

    public setLanguage(lang) {
        this.setLang = lang;
    }
}