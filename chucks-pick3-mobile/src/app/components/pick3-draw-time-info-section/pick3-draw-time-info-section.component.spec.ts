import {async, ComponentFixture, TestBed} from '@angular/core/testing';
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

  describe('Pick3DrawTimeInfoSectionComponent', () => {
  const date = new Date();
  let component: Pick3DrawTimeInfoSectionComponent;
  let fixture: ComponentFixture<Pick3DrawTimeInfoSectionComponent>;
  let router: Router;
  let drawStateService = DrawStateService;
  let drawDateService: DrawDateService;
  let appService: AppService;
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
      declarations: [Pick3DrawTimeInfoSectionComponent],
      imports: [CommonModule, IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule, TranslateModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [AppService, Pick3WebScrapingProviderService, AppService, DrawStateService, DrawDateService, CardContextService]
    }).compileComponents();
    router = TestBed.get(Router);
    appService = TestBed.get(AppService);
    drawStateService = TestBed.get(DrawStateService);
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
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  });
