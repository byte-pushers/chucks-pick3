import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PreviousWinningNumberCardComponent } from './previous-winning-number-card.component';
import { CardContextService } from '../../services/card-context.service';
import { Pick3WebScrapingProviderService } from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrawStateService } from '../../services/draw-state.service';
import { Pick3DrawTimeEnum } from '../../models/pick3-draw-time.enum';
import { Pick3DrawDateCardDomain } from '../../models/pick3-draw-date-card.domain';
import { Pick3LotteryService } from '../../services/pick3-lottery.service';

describe('PreviousWinningNumberCardComponent', () => {
  const date = new Date();
  const yesterdaysDate: Date = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  let component: PreviousWinningNumberCardComponent;
  let fixture: ComponentFixture<PreviousWinningNumberCardComponent>;
  let router: Router;
  let model;
  let yesterdayModel;
  let drawStateService = DrawStateService;
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
    yesterdayModel = new Pick3DrawDateCardDomain({
      drawDate: yesterdaysDate,
      drawState: 'gotoHome',
      drawTime: Pick3DrawTimeEnum.DAY,
      drawTimeAsString: 'Day',
      upcomingDrawTime: yesterdaysDate,
      hasWinner: false,
      backgroundImage: Pick3LotteryService,
      winningNumber: 462,
      winningNumberDigits: [1, 9, 2],
      drawDateIcon: yesterdaysDate,
      slideNumber: 6,
      defaultDrawDateTime: Pick3DrawTimeEnum.DAY,
      slideName: 'Home',
    });

    TestBed.configureTestingModule({
      declarations: [PreviousWinningNumberCardComponent],
      imports: [CommonModule, IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule, TranslateModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [AppService, Pick3WebScrapingProviderService, DrawStateService, CardContextService],
    }).compileComponents();
    router = TestBed.get(Router);
    drawStateService = TestBed.get(DrawStateService);
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: {
        state: {
          currentSlideNumber: 7,
          currentDay: date,
        },
      },
    } as any);
    const mockUrlTree = router.parseUrl('/home');
    // @ts-ignore: force this private property value for testing.
    router.currentUrlTree = mockUrlTree;
    fixture = TestBed.createComponent(PreviousWinningNumberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectDrawingDateMenuItemForToday ', () => {
    const selectDrawingDateMenuItemForTodaySpy = spyOn(component, 'selectDrawingDateMenuItemForToday');
    component.ngOnInit();
    expect(selectDrawingDateMenuItemForTodaySpy).toHaveBeenCalled();
  });

  /*  it('should call setDrawingTimeMenuItems', () => {
    const setDrawingTimeMenuItemsSpy = spyOn(
      component,
      'setDrawingTimeMenuItems'
    );
    const today: HTMLElement = document.getElementById('today');
    const yesterday: HTMLElement = document.getElementById('yesterday');
    component.selectDrawingDateMenuItemForYesterday(yesterday, today);
    expect(setDrawingTimeMenuItemsSpy).toHaveBeenCalled();
  });*/

  /*  it('should call setDrawingTimeMenuItems', () => {
    const setDrawingTimeMenuItemsForClosedDaySpy = spyOn(
      component,
      'setDrawingTimeMenuItemsForClosedDay'
    );
    const today: HTMLElement = document.getElementById('today');
    const yesterday: HTMLElement = document.getElementById('yesterday');
    component.selectDrawingDateMenuItemForYesterday(yesterday, today);
    expect(setDrawingTimeMenuItemsForClosedDaySpy).toHaveBeenCalled();
  });*/

  it('should  call resetDrawingTimes', () => {
    const resetDrawingTimesSpy = spyOn(component, 'resetDrawingTimes');
    component.setDrawingTimeMenuItems(model);
    expect(resetDrawingTimesSpy).toHaveBeenCalled();
  });

  it('should  call resetDrawingTimes for yesterday', () => {
    const resetDrawingTimesSpy = spyOn(component, 'resetDrawingTimes');
    component.setDrawingTimeMenuItems(yesterdayModel);
    expect(resetDrawingTimesSpy).toHaveBeenCalled();
  });

  it('should  call resetDrawingTimes', () => {
    const resetDrawingTimesSpy = spyOn(component, 'resetDrawingTimes');
    component.setDrawingTimeMenuItemsForClosedDay(model);
    expect(resetDrawingTimesSpy).toHaveBeenCalled();
  });

  it('should  define newDrawingTimes', () => {
    component.setDrawingTimeMenuItemsForClosedDay(model);
    expect(component.newDrawingTimes).toBeDefined();
  });

  it('should  define newDrawingTimes', () => {
    component.setDrawingTimeMenuItemsForClosedDay(yesterdayModel);
    expect(component.newDrawingTimes).toBeDefined();
  });

  it('should return the continue button as false', function () {
    component.continueChoice = false;
    component.currentDrawingCard.showCountDownToDrawing = false;
    component.validatePreviousWinningNumberComp();
    expect(component.continueButton).toBeTrue();
  });
});
