import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CardContextService} from '../../services/card-context.service';
import {NumberUtilityService} from '../../services/numberUtility.service';
import {Pick3DrawTimeCardDomain} from '../../models/pick3-draw-time-card.domain';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import {DrawTimeService} from '../../services/draw-time.service';
import {Pick3DrawDateInfoSection} from './pick3-draw-date-info-section';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {I18nService} from "../../services/i18n.service";
import {Pick3WebScrapingProviderService} from "../../providers/web-scraping/pick3-web-scraping-provider.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {Pick3DrawDateCardDomain} from "../../models/pick3-draw-date-card.domain";
import {Pick3LotteryService} from "../../services/pick3-lottery.service";
import {DrawDateService} from "../../services/draw-date.service";

describe('Pick3DrawDateInfoSection', () => {
  const date = new Date();
  let component: Pick3DrawDateInfoSection;
  let fixture: ComponentFixture<Pick3DrawDateInfoSection>;
  let model;
  let router: Router;
  let drawDateService: DrawDateService;
  beforeEach(async(() => {
    model = new Pick3DrawDateCardDomain({
      drawDate: date,
      drawState: 'gotoHome',
      drawTime: Pick3DrawTimeEnum.MORNING,
      drawTimeAsString: 'Morning',
      upcomingDrawTime: date,
      hasWinner: false,
      backgroundImage: Pick3LotteryService,
      winningNumber: 462,
      winningNumberDigits: [4, 6, 2],
      drawDateIcon: date,
      slideNumber: 7

    });
    TestBed.configureTestingModule({
      declarations: [Pick3DrawDateInfoSection],
      imports: [CommonModule, IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule, TranslateModule, HttpClientTestingModule],
      providers: [CardContextService, NumberUtilityService, I18nService, AppService, Pick3WebScrapingProviderService, DrawDateService]
    }).compileComponents();
    router = TestBed.get(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: {
        state: {
          currentSlideNumber: 7,
          currentDay: Pick3DrawTimeEnum.DAY
        }
      }
    } as any);
    fixture = TestBed.createComponent(Pick3DrawDateInfoSection);
    component = fixture.componentInstance;
    drawDateService = TestBed.get(DrawDateService);
    drawDateService.dispatchCurrentDrawDateCardEvent(model);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
