import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PopoverController} from '@ionic/angular';
import {I18nService} from '../../services/i18n.service';

@Component({
    selector: 'app-language-popover',
    templateUrl: './language-popover.component.html',
    styleUrls: ['./language-popover.component.scss'],
})
export class LanguagePopoverComponent implements OnInit {
    constructor(public translate: TranslateService,
                public popoverCtrl: PopoverController,
                public passLang: I18nService) {
    translate.setDefaultLang('en');
}

switchLanguage(lang: string) {
    this.passLang.setLanguage(lang);
    this.translate.use(lang);
}


    public async dismissClick() {
        await this.popoverCtrl.dismiss();
    }

    ngOnInit() {
    }

}
