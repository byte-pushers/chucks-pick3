import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CardContextService} from '../../services/card-context.service';
import {AppService} from '../../app.service';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {DrawDateService} from '../../services/draw-date.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DrawStateService} from '../../services/draw-state.service';
import {Router} from '@angular/router';
import {Pick3DrawDateCardDomain} from '../../models/pick3-draw-date-card.domain';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3LotteryService} from '../../services/pick3-lottery.service';
import {Pick3DrawTimeInfoSectionComponent} from './pick3-draw-time-info-section.component';
import {DrawTimeService} from '../../services/draw-time.service';
import {of} from 'rxjs';
import {Pick3DrawTimeCardDomain} from '../../models/pick3-draw-time-card.domain';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';

describe('Pick3DrawTimeInfoSectionComponent', () => {
  const date = new Date();
  let component: Pick3DrawTimeInfoSectionComponent;
  let fixture: ComponentFixture<Pick3DrawTimeInfoSectionComponent>;
  let router: Router;
  let drawStateService = DrawStateService;
  let drawDateService: DrawDateService;
  let drawTimeService: DrawTimeService;
  let appService: AppService;
  let model;
  let pick3DrawTimeModel;
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
    pick3DrawTimeModel = new Pick3DrawTimeCardDomain({
      pick3DrawCardId: 7,
      icon: 'Morning',
      title: 'Morning',
      pick3DrawTime: Pick3DrawTimeEnum.MORNING,
      dateTime: new Date(),
      drawTime: Pick3DrawTimeEnum.MORNING,
      state: Pick3DrawTimeCardStateEnum.DRAWN,
      selected: true,
      showCountDownToDrawing: false,
      pick3DrawTimeArray: [33, 555, 264, 346, 345]
    });
    TestBed.configureTestingModule({
      declarations: [Pick3DrawTimeInfoSectionComponent],
      imports: [CommonModule, IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule, TranslateModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [AppService, Pick3WebScrapingProviderService, AppService, DrawStateService, DrawTimeService, DrawDateService, CardContextService]
    }).compileComponents();
    router = TestBed.get(Router);
    appService = TestBed.get(AppService);
    drawStateService = TestBed.get(DrawStateService);
    drawTimeService = TestBed.get(DrawTimeService);
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: {
        state: {
          currentSlideNumber: 7,
          currentDay: date
        }
      }
    } as any);
    fixture = TestBed.createComponent(Pick3DrawTimeInfoSectionComponent);
    component = fixture.componentInstance;
    drawDateService = TestBed.get(DrawDateService);
    drawDateService.dispatchCurrentDrawDateCardEvent(model);
    drawTimeService.setCurrentDrawTimeCard(pick3DrawTimeModel);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get and set the currentPick3DrawTimeCard', fakeAsync(() => {
    component.ngOnInit();
    expect(component.drawTimes).toBeDefined();
  }));

  it('should have drawTimes as defined ',  () => {
    component.ngOnInit();
    expect(component.drawTimes).toBeDefined();
  });

  it('retrieves all the cars', async(  (  ) => {
    drawTimeService.getPick3DrawTime$().subscribe(result => expect(result.drawTime).toBeGreaterThan(0));
  }));


});
