import {Component, OnDestroy, OnInit} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import {TranslateService} from '@ngx-translate/core';
import {LanguagePopoverComponent} from '../../components/language-popover/language-popover.component';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'card-page',
    templateUrl: './card.page.html',
    styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit, OnDestroy {
    private static couter = 0;
    private readonly id: number;

    constructor(public translateService: TranslateService,
                private popoverController: PopoverController) {
        translateService.setDefaultLang('en-US');
        this.id = ++CardPage.couter;
        console.log(`CardPage.constructor: id: ${this.id}`);
    }

    ngOnInit(): void {
        registerLocaleData(localeEsMx, 'es-MX');
        registerLocaleData(localeEnUS, 'en-US');
    }
    async showPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: LanguagePopoverComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true
        });
        popover.style.cssText = '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
        return await popover.present();
    }
    ngOnDestroy(): void {

    }

    public updateCard(): void {

    }
}
