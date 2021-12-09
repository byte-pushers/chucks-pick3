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
import {Pick3DrawTimeCardComponent} from './pick3-draw-time-card.component';
import {Pick3DrawTimeCardDomain} from '../../models/pick3-draw-time-card.domain';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import {DrawTimeService} from '../../services/draw-time.service';

describe('Pick3DrawTimeCardComponent', () => {
  const date = new Date();
  let component: Pick3DrawTimeCardComponent;
  let fixture: ComponentFixture<Pick3DrawTimeCardComponent>;
  let router: Router;
  let drawStateService = DrawStateService;
  let drawTimeService: DrawTimeService;
  let model;
  beforeEach(async(() => {
    model = new Pick3DrawTimeCardDomain({
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
      declarations: [Pick3DrawTimeCardComponent],
      imports: [CommonModule, IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule, TranslateModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [AppService, Pick3WebScrapingProviderService, DrawStateService, DrawTimeService, CardContextService]
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
    fixture = TestBed.createComponent(Pick3DrawTimeCardComponent);
    component = fixture.componentInstance;
    drawTimeService = TestBed.get(DrawTimeService);
    drawTimeService.setCurrentDrawTimeCard(model);
    component.oldData = model;
    component.data = model;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
