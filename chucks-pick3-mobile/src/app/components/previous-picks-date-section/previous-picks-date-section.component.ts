import { Component, OnInit } from '@angular/core';
import { Pick3DrawDateCard } from '../../models/pick3-draw-date-card';
import { Pick3DrawDateCardDomain } from '../../models/pick3-draw-date-card.domain';
import { DrawStateService } from '../../services/draw-state.service';
import { Router } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { TranslateService } from '@ngx-translate/core';
import { DrawDateService } from '../../services/draw-date.service';
import { AppService } from '../../app.service';
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import { Pick3DrawTimeCard } from '../../models/pick3-draw-time-card';
import { SelectPicksService } from '../../services/select-picks.service';
import * as BytePushers from 'bytepushers-js-core';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-previous-picks-date-section',
  templateUrl: './previous-picks-date-section.component.html',
  styleUrls: ['./previous-picks-date-section.component.scss'],
})
export class PreviousPicksDateSectionComponent implements OnInit {
  public showCountDownToDrawing = this.time.showCountDownToDrawing;
  public pick3GenerateId: number;
  public currentSlideNumber: number;
  private routerUrl;

  /* istanbul ignore next */
  get data() {
    return this.selectPicksService.getSelectedPick3DrawDateCard();
  }

  /* istanbul ignore next */
  get time() {
    return this.selectPicksService.getSelectedPick3DrawTimeCard();
  }

  /* istanbul ignore next */
  get background() {
    return this.appService.getBackgroundImageUrl();
  }

  /* istanbul ignore next */
  constructor(public drawStateService: DrawStateService, private appService: AppService, private selectPicksService: SelectPicksService, private router: Router, private navCtrl: NavController, public translate: I18nService, public translateService: TranslateService) {
    this.routerUrl = this.router.url;
  }

  /* istanbul ignore next */
  ngOnInit(): void {
    registerLocaleData(localeEsMx, 'es-MX');
    registerLocaleData(localeEnUS, 'en-US');
  }

  /* istanbul ignore next */
  public returnToPreviousPage(): void {
    this.navCtrl.pop();
  }
}
