import {Component, OnDestroy, OnInit} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'card-page',
    templateUrl: './card.page.html',
    styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit, OnDestroy {
    constructor(public translateService: TranslateService) {
        translateService.setDefaultLang('en-US');
    }

    ngOnInit(): void {
        registerLocaleData(localeEsMx, 'es-MX');
        registerLocaleData(localeEnUS, 'en-US');
    }

    ngOnDestroy(): void {

    }

}
