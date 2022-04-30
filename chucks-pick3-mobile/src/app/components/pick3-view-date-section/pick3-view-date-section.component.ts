import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawStateService } from '../../services/draw-state.service';
import { SelectPicksService } from '../../services/select-picks.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { I18nService } from '../../services/i18n.service';
import { TranslateService } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import { Pick3DrawTimeEnum } from '../../models/pick3-draw-time.enum';
import { Pick3DrawTimeCardProperties } from '../../models/pick3-draw-time-card.properties';
import { IonicToastNotificationService } from '../../services/ionic-toast-notification.service';
import { Pick3WebScrapingProviderService } from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-pick3-view-date-section',
  templateUrl: './pick3-view-date-section.component.html',
  styleUrls: ['./pick3-view-date-section.component.scss'],
})
export class Pick3ViewDateSectionComponent implements OnInit, OnDestroy {
  public defaultDrawDateTime: Pick3DrawTimeEnum;
  public showCountDownToDrawing = false;
  public selectedDrawTimeCard: Pick3DrawTimeCardProperties;
  public generateNavigation: any;
  public currentSlideNumber: number;
  private static counter = 0;
  private routerUrl;

  /* istanbul ignore next */
  get data() {
    return this.selectPicksService.getSelectedPick3DrawDateCard();
  }
  /* istanbul ignore next */
  get time() {
    return this.selectPicksService.getSelectedPick3DrawTimeCard();
  }

  get background() {
    return this.appService.getBackgroundImageUrl();
  }
  /* istanbul ignore next */
  constructor(private selectPicksService: SelectPicksService, private toastService: IonicToastNotificationService, private router: Router, public translate: I18nService, public translateService: TranslateService, private pick3WebScrappingService: Pick3WebScrapingProviderService, private appService: AppService) {
    this.routerUrl = this.router.url;
  }
  /* istanbul ignore next */
  ngOnInit(): void {
    registerLocaleData(localeEsMx, 'es-MX');
    registerLocaleData(localeEnUS, 'en-US');
  }

  /* istanbul ignore next */
  ngOnDestroy(): void {
    this.defaultDrawDateTime = null;
    this.showCountDownToDrawing = false;
    this.appService = null;

    if (this.routerUrl === '/home') {
      Pick3ViewDateSectionComponent.counter--;
      console.log(`Pick3DrawDateInfoSection.ngOnDestroy: counter: ${Pick3ViewDateSectionComponent.counter}`);
    }
  }
}
