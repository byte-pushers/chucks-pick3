import { Pipe, PipeTransform } from '@angular/core';
import {I18nService} from '../services/i18n.service';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'dateTranslate'
})
export class DateTranslatePipe implements PipeTransform {
// Left as reference just in case we wish to use a custom pipe
  constructor(public translate: I18nService,
              public translateService: TranslateService) {
  }
   currentLang = this.translate.setLang;
  transform(value: any, pattern: string = 'mediumDate'): any {
      const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
      return datePipe.transform(value, pattern);
  }

}
