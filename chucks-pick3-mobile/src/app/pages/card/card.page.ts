import { Component, OnDestroy, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import { TranslateService } from '@ngx-translate/core';
import { LanguagePopoverComponent } from '../../components/language-popover/language-popover.component';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'card-page',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit, OnDestroy {
  private static counter = 0;
  public id: number = -1;
  public currentSlideNumber: number;
  private routerUrl: string;

  constructor(public translateService: TranslateService, private popoverController: PopoverController, private router: Router, private appService: AppService) {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.routerUrl = this.router.url;

    this.routerUrl = this.router.url;
    translateService.setDefaultLang('en-US');
    /* istanbul ignore if */
    /* istanbul ignore else */
    if (this.routerUrl === '/home') {
      this.id = ++CardPage.counter;
      /* istanbul ignore next */
    } else if (this.routerUrl === '/select-picks') {
      this.currentSlideNumber = this.appService.pick3CardId;
    }
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
      translucent: true,
    });
    /* istanbul ignore next */
    popover.style.cssText = '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
    /* istanbul ignore next */
    return await popover.present();
  }

  ngOnDestroy(): void {
    /* istanbul ignore else */
    if (this.routerUrl === '/home') {
      CardPage.counter--;
    }
  }
}
