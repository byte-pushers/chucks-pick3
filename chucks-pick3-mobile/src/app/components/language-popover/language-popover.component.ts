import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PopoverController} from '@ionic/angular';
import {TranslateCheckService} from '../../services/translate-check.service';

@Component({
    selector: 'app-language-popover',
    templateUrl: './language-popover.component.html',
    styleUrls: ['./language-popover.component.scss'],
})
export class LanguagePopoverComponent implements OnInit {
    newLang: string;

    constructor(public translate: TranslateService,
                public popoverCtrl: PopoverController,
                public passLang: TranslateCheckService) {
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
