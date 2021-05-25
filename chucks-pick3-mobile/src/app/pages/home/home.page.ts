import {Component, OnInit} from '@angular/core';
import { Pick3DrawDateCard } from '../../models/pick3-draw-date-card';
import { Pick3DrawDateCardDomain } from '../../models/pick3-draw-date-card.domain';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {LanguagePopoverComponent} from '../../components/language-popover/language-popover.component';
import {PopoverController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {registerLocaleData} from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import {I18nService} from '../../services/i18n.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  default = {
    drawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING
  };
  slideOpts = {
    initialSlide: 7,
    speed: 400
  };
  pick3DrawDateDecks: Array<Pick3DrawDateCard> = [
    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG),
/*    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG),*/
/*    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG),
    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG),
    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG),
    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG),
    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG)*/
  ];

  constructor(private popoverCtrl: PopoverController,
              public translate: I18nService,
              public translateService: TranslateService) {
    translateService.setDefaultLang('en-US');
  }

  ngOnInit() {
    registerLocaleData(localeEsMx, 'es-MX');
    registerLocaleData(localeEnUS, 'en-US');
  }

  async showPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    popover.style.cssText = '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
    return await popover.present();
  }
}
