import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviousPicksDateSectionComponent } from './previous-picks-date-section.component';
import { Pick3DrawDateInfoSection } from '../pick3-draw-date-info-section/pick3-draw-date-info-section';
import { Router } from '@angular/router';
import { DrawDateService } from '../../services/draw-date.service';
import { DrawTimeService } from '../../services/draw-time.service';
import { Pick3DrawDateCardDomain } from '../../models/pick3-draw-date-card.domain';
import { Pick3DrawTimeEnum } from '../../models/pick3-draw-time.enum';
import { Pick3LotteryService } from '../../services/pick3-lottery.service';
import { Pick3DrawTimeCardDomain } from '../../models/pick3-draw-time-card.domain';
import { Pick3DrawTimeCardStateEnum } from '../../models/pick3-draw-time-card-state.enum';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardContextService } from '../../services/card-context.service';
import { NumberUtilityService } from '../../services/numberUtility.service';
import { I18nService } from '../../services/i18n.service';
import { AppService } from '../../app.service';
import { Pick3WebScrapingProviderService } from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import { Pick3GenerateDateSectionComponent } from '../pick3-generate-date-section/pick3-generate-date-section.component';
import { SelectPicksService } from '../../services/select-picks.service';
import { Pick3ViewDateSectionComponent } from '../pick3-view-date-section/pick3-view-date-section.component';

describe('PreviousPicksDateSectionComponent', () => {
  const date = new Date();
  let component: PreviousPicksDateSectionComponent;
  let fixture: ComponentFixture<PreviousPicksDateSectionComponent>;
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
      declarations: [PreviousPicksDateSectionComponent],
      imports: [CommonModule, IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule, TranslateModule, HttpClientTestingModule],
      providers: [CardContextService, NumberUtilityService, I18nService, AppService, Pick3WebScrapingProviderService, DrawTimeService, SelectPicksService],
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
    fixture = TestBed.createComponent(PreviousPicksDateSectionComponent);
    component = fixture.componentInstance;
    selectPicksService = TestBed.get(SelectPicksService);
    selectPicksService.setSelectedPick3DrawDateCard(model);
    selectPicksService.setSelectedPick3DrawTimeCard(drawTimeModel);
    fixture.detectChanges();
  }));
});
