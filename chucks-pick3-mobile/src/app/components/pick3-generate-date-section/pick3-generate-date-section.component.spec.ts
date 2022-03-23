import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pick3GenerateDateSectionComponent } from './pick3-generate-date-section.component';
import { Router } from '@angular/router';
import { DrawDateService } from '../../services/draw-date.service';
import { DrawTimeService } from '../../services/draw-time.service';
import { Pick3DrawDateCardDomain } from '../../models/pick3-draw-date-card.domain';
import { Pick3DrawTimeEnum } from '../../models/pick3-draw-time.enum';
import { Pick3LotteryService } from '../../services/pick3-lottery.service';
import { Pick3DrawTimeCardDomain } from '../../models/pick3-draw-time-card.domain';
import { Pick3DrawTimeCardStateEnum } from '../../models/pick3-draw-time-card-state.enum';
import { Pick3DrawDateInfoSection } from '../pick3-draw-date-info-section/pick3-draw-date-info-section';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardContextService } from '../../services/card-context.service';
import { NumberUtilityService } from '../../services/numberUtility.service';
import { I18nService } from '../../services/i18n.service';
import { AppService } from '../../app.service';
import { Pick3WebScrapingProviderService } from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import { SelectPicksService } from '../../services/select-picks.service';

describe('Pick3GenerateDateSectionComponent', () => {
  const date = new Date();
  let component: Pick3GenerateDateSectionComponent;
  let fixture: ComponentFixture<Pick3GenerateDateSectionComponent>;
  let model;
  let drawTimeModel;
  let router: Router;
  let selectPicksService: SelectPicksService;

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
      slideNumber: 7,
      defaultDrawDateTime: Pick3DrawTimeEnum.MORNING,
      slideName: 'Home',
    });

    drawTimeModel = new Pick3DrawTimeCardDomain({
      pick3DrawCardId: 7,
      icon: 'Morning',
      title: 'Morning',
      pick3DrawTime: Pick3DrawTimeEnum.MORNING,
      dateTime: date,
      drawTime: Pick3DrawTimeEnum.MORNING,
      state: Pick3DrawTimeCardStateEnum.DRAWN,
      selected: date,
      showCountDownToDrawing: false,
      pick3DrawTimeArray: [33, 555, 264, 346, 345],
    });
    TestBed.configureTestingModule({
      declarations: [Pick3GenerateDateSectionComponent],
      imports: [
        CommonModule,
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule,
        TranslateModule,
        HttpClientTestingModule,
      ],
      providers: [
        CardContextService,
        NumberUtilityService,
        I18nService,
        AppService,
        Pick3WebScrapingProviderService,
        DrawTimeService,
        SelectPicksService,
      ],
    }).compileComponents();
    router = TestBed.get(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: {
        state: {
          currentSlideNumber: 7,
          currentDay: Pick3DrawTimeEnum.DAY,
        },
      },
    } as any);
    const mockUrlTree = router.parseUrl('/home');
    // @ts-ignore: force this private property value for testing.
    router.currentUrlTree = mockUrlTree;
    fixture = TestBed.createComponent(Pick3GenerateDateSectionComponent);
    component = fixture.componentInstance;
    selectPicksService = TestBed.get(SelectPicksService);
    selectPicksService.setSelectedPick3DrawDateCard(model);
    fixture.detectChanges();
  }));
});
