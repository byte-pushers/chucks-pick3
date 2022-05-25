import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.component.html',
  styleUrls: ['./language-popover.component.scss'],
})
export class LanguagePopoverComponent implements OnInit {
  constructor(public translateService: TranslateService, public popoverCtrl: PopoverController) {}

  switchLanguage(lang: string) {
    this.translateService.use(lang);
  }

  /* istanbul ignore next */
  public async dismissClick() {
    await this.popoverCtrl.dismiss();
  }

  ngOnInit() {}
}
