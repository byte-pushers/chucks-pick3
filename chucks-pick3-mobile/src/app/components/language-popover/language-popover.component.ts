import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-language-popover',
    templateUrl: './language-popover.component.html',
    styleUrls: ['./language-popover.component.scss'],
})
export class LanguagePopoverComponent implements OnInit {
lang = 'en';
    constructor(public translate: TranslateService,
                public popoverCtrl: PopoverController) {
        translate.setDefaultLang('en');
    }

    switchLanguage(lang: string) {
        this.translate.use(lang);
    }


    public async dismissClick() {
        await this.popoverCtrl.dismiss();
    }

    ngOnInit() {
    }

}
