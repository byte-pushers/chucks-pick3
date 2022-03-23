import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pick3DrawDateCard } from '../../models/pick3-draw-date-card';
import { Pick3DrawDateCardDomain } from '../../models/pick3-draw-date-card.domain';
import { Pick3DrawTimeEnum } from '../../models/pick3-draw-time.enum';
import { Pick3DrawTimeCard } from '../../models/pick3-draw-time-card';
import { Pick3DrawTimeCardProperties } from '../../models/pick3-draw-time-card.properties';
import { Subscription } from 'rxjs';
import { CardContextService } from '../../services/card-context.service';
import { DrawStateService } from '../../services/draw-state.service';
import { IonicToastNotificationService } from '../../services/ionic-toast-notification.service';
import { Router } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { TranslateService } from '@ngx-translate/core';
import { DrawDateService } from '../../services/draw-date.service';
import { Pick3WebScrapingProviderService } from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import { AppService } from '../../app.service';
import { NavController, PopoverController } from '@ionic/angular';
import { StateDrawDateService } from '../../services/state-draw-date.service';
import { Pick3DrawTime } from '../../models/pick3-draw-time';
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import { LanguagePopoverComponent } from '../language-popover/language-popover.component';
import * as BytePushers from 'bytepushers-js-core';
import { Pick3DrawTimeCardStateEnum } from '../../models/pick3-draw-time-card-state.enum';
import { NavigationEnum } from '../../models/navigate.enum';
import { SelectPicksService } from '../../services/select-picks.service';
import { GeneratePicksService } from '../../services/generate-picks.service';

@Component({
  selector: 'app-pick3-generate-date-section',
  templateUrl: './pick3-generate-date-section.component.html',
  styleUrls: ['./pick3-generate-date-section.component.scss'],
})
export class Pick3GenerateDateSectionComponent implements OnInit, OnDestroy {
  public defaultDrawDateTime: Pick3DrawTimeEnum;
  public showCountDownToDrawing = false;
  public selectedDrawTimeCard: Pick3DrawTimeCardProperties;
  public generateNavigation: any;
  public currentSlideNumber: number;
  private static counter = 0;
  private routerUrl;

  get data() {
    return this.selectPicksService.getSelectedPick3DrawDateCard();
  }

  get time() {
    return this.selectPicksService.getSelectedPick3DrawTimeCard();
  }
  constructor(
    private selectPicksService: SelectPicksService,
    private generatePicksService: GeneratePicksService,
    private toastService: IonicToastNotificationService,
    private router: Router,
    public translate: I18nService,
    public translateService: TranslateService,
    private pick3WebScrappingService: Pick3WebScrapingProviderService,
    private appService: AppService
  ) {
    this.routerUrl = this.router.url;
  }

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
      Pick3GenerateDateSectionComponent.counter--;
      console.log(
        `Pick3DrawDateInfoSection.ngOnDestroy: counter: ${Pick3GenerateDateSectionComponent.counter}`
      );
    }
  }
}
