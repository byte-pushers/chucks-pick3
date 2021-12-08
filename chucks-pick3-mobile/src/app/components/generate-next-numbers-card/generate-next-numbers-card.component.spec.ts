import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateNextNumbersCardComponent } from './generate-next-numbers-card.component';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CardContextService} from "../../services/card-context.service";
import {NumberUtilityService} from "../../services/numberUtility.service";
import {I18nService} from "../../services/i18n.service";
import {AppService} from "../../app.service";
import {Pick3WebScrapingProviderService} from "../../providers/web-scraping/pick3-web-scraping-provider.service";
import {DrawDateService} from "../../services/draw-date.service";
import {PreviousWinningNumberCardComponent} from "../previous-winning-number-card/previous-winning-number-card.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DrawStateService} from "../../services/draw-state.service";
import {Router} from "@angular/router";
import {Pick3DrawDateCardDomain} from "../../models/pick3-draw-date-card.domain";
import {Pick3DrawTimeEnum} from "../../models/pick3-draw-time.enum";
import {Pick3LotteryService} from "../../services/pick3-lottery.service";

describe('GenerateNextNumbersCardComponent', () => {
  const date = new Date();
  let component: GenerateNextNumbersCardComponent;
  let fixture: ComponentFixture<GenerateNextNumbersCardComponent>;
  let router: Router;
  let drawStateService = DrawStateService;
  let drawDateService: DrawDateService;
  let model;
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
      declarations: [GenerateNextNumbersCardComponent],
      imports: [CommonModule, IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule, TranslateModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [AppService, Pick3WebScrapingProviderService, DrawStateService, DrawDateService, CardContextService]
    }).compileComponents();
    router = TestBed.get(Router);
    drawStateService = TestBed.get(DrawStateService);
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: {
        state: {
          currentSlideNumber: 7,
          currentDay: date
        }
      }
    } as any);
    fixture = TestBed.createComponent(GenerateNextNumbersCardComponent);
    component = fixture.componentInstance;
    drawDateService = TestBed.get(DrawDateService);
    drawDateService.dispatchCurrentDrawDateCardEvent(model);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setDrawingTimeMenuItems',  () => {
    const setDrawingTimeMenuItemsSpy = spyOn(component, 'setDrawingTimeMenuItems');
    const today: HTMLElement = document.getElementById('today');
    const tomorrow: HTMLElement = document.getElementById('tomorrow');
    component.selectTomorrowGenerateDrawingDate(tomorrow, today);
    expect(setDrawingTimeMenuItemsSpy).toHaveBeenCalled();
  });

  it('should generate numbers', () => {
    component.submitGenerate();
    expect(component.pick3CardToGenerate.pick3DrawTimeArray).toBeDefined();
  });
});
