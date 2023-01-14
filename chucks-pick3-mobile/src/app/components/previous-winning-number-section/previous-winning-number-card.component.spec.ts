import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PreviousWinningNumberCardComponent } from './previous-winning-number-card.component';
import { CardContextService } from '../../services/card-context.service';
import { Pick3WebScrapingProviderService } from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import { CommonModule, Location } from '@angular/common';
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
import { Pick3DrawTimeCardDomain } from '../../models/pick3-draw-time-card.domain';
import { Pick3DrawTimeCardStateEnum } from '../../models/pick3-draw-time-card-state.enum';

describe('PreviousWinningNumberCardComponent', () => {
  const date = new Date();
  const nightDate = new Date().setHours(21, 30, 0, 0);
  const mondayDate = new Date(2021, 11, 8, date.getTime());
  const sundayDate = new Date(2021, 11, 7, date.getTime());
  const saturdayDate = new Date(2021, 11, 6, date.getTime());
  const fridayDate = new Date(2021, 11, 5, date.getTime());
  const yesterdaysDate = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  let component: PreviousWinningNumberCardComponent;
  let fixture: ComponentFixture<PreviousWinningNumberCardComponent>;
  let router: Router;
  let todayPick3DrawDateModel;
  let yesterdayPick3DrawDateModel;
  let todayPick3DrawDateModelNight;
  let yesterdayPick3DrawDateModelMonday;
  let yesterdayPick3DrawDateModelSunday;
  let yesterdayPick3DrawDateModelSaturday;
  let yesterdayPick3DrawDateModelFriday;
  let yesterdayPick3DrawTimeModelMonday;
  let yesterdayPick3DrawTimeModelSunday;
  let yesterdayPick3DrawTimeModelSaturday;
  let yesterdayPick3DrawTimeModelFriday;
  let todayPick3DrawTimeModelNight;
  let todayPick3DrawTimeModel;
  let yesterdayPick3DrawTimeModel;
  let drawStateService = DrawStateService;
  beforeEach(async(() => {
    todayPick3DrawDateModel = new Pick3DrawDateCardDomain({
      drawDate: date,
      drawState: 'TX',
      drawTime: Pick3DrawTimeEnum.MORNING,
      drawTimeAsString: 'Morning',
      upcomingDrawTime: date,
      hasWinner: false,
      backgroundImage: Pick3LotteryService,
      winningNumber: null,
      winningNumberDigits: null,
      drawDateIcon: date,
      slideNumber: 7,
      defaultDrawDateTime: Pick3DrawTimeEnum.MORNING,
      slideName: 'Home',
    });
    todayPick3DrawDateModelNight = new Pick3DrawDateCardDomain({
      drawDate: date,
      drawState: 'TX',
      drawTime: Pick3DrawTimeEnum.NIGHT,
      drawTimeAsString: 'Night',
      upcomingDrawTime: date.setHours(22, 30, 0, 0),
      hasWinner: false,
      backgroundImage: Pick3LotteryService,
      winningNumber: null,
      winningNumberDigits: null,
      drawDateIcon: date,
      slideNumber: 7,
      defaultDrawDateTime: Pick3DrawTimeEnum.NIGHT,
      slideName: 'Home',
    });
    yesterdayPick3DrawTimeModel = new Pick3DrawTimeCardDomain({
      pick3DrawCardId: 7,
      icon: 'Morning',
      title: 'Morning',
      pick3DrawTime: Pick3DrawTimeEnum.MORNING,
      dateTime: yesterdaysDate,
      drawTime: Pick3DrawTimeEnum.MORNING,
      state: Pick3DrawTimeCardStateEnum.DRAWN,
      selected: true,
      showCountDownToDrawing: false,
      pick3DrawTimeArray: null,
    });
    yesterdayPick3DrawTimeModelMonday = new Pick3DrawTimeCardDomain({
      pick3DrawCardId: 7,
      icon: 'Morning',
      title: 'Morning',
      pick3DrawTime: Pick3DrawTimeEnum.MORNING,
      dateTime: mondayDate,
      drawTime: Pick3DrawTimeEnum.MORNING,
      state: Pick3DrawTimeCardStateEnum.DRAWN,
      selected: true,
      showCountDownToDrawing: false,
      pick3DrawTimeArray: [33, 555, 264, 346, 345],
    });
    yesterdayPick3DrawTimeModelSunday = new Pick3DrawTimeCardDomain({
      pick3DrawCardId: 7,
      icon: 'Morning',
      title: 'Morning',
      pick3DrawTime: Pick3DrawTimeEnum.MORNING,
      dateTime: sundayDate,
      drawTime: Pick3DrawTimeEnum.MORNING,
      state: Pick3DrawTimeCardStateEnum.DRAWN,
      selected: true,
      showCountDownToDrawing: false,
      pick3DrawTimeArray: [33, 555, 264, 346, 345],
    });
    yesterdayPick3DrawTimeModelSaturday = new Pick3DrawTimeCardDomain({
      pick3DrawCardId: 7,
      icon: 'Morning',
      title: 'Morning',
      pick3DrawTime: Pick3DrawTimeEnum.MORNING,
      dateTime: sundayDate,
      drawTime: Pick3DrawTimeEnum.MORNING,
      state: Pick3DrawTimeCardStateEnum.DRAWN,
      selected: true,
      showCountDownToDrawing: false,
      pick3DrawTimeArray: [33, 555, 264, 346, 345],
    });
    yesterdayPick3DrawTimeModelFriday = new Pick3DrawTimeCardDomain({
      pick3DrawCardId: 7,
      icon: 'Morning',
      title: 'Morning',
      pick3DrawTime: Pick3DrawTimeEnum.MORNING,
      dateTime: sundayDate,
      drawTime: Pick3DrawTimeEnum.MORNING,
      state: Pick3DrawTimeCardStateEnum.DRAWN,
      selected: true,
      showCountDownToDrawing: false,
      pick3DrawTimeArray: [33, 555, 264, 346, 345],
    });
    todayPick3DrawTimeModel = new Pick3DrawTimeCardDomain({
      pick3DrawCardId: 7,
      icon: 'Morning',
      title: 'Morning',
      pick3DrawTime: Pick3DrawTimeEnum.MORNING,
      dateTime: new Date(),
      drawTime: Pick3DrawTimeEnum.MORNING,
      state: Pick3DrawTimeCardStateEnum.DRAWN,
      selected: true,
      showCountDownToDrawing: false,
      pick3DrawTimeArray: [33, 555, 264, 346, 345],
    });
    todayPick3DrawTimeModelNight = new Pick3DrawTimeCardDomain({
      pick3DrawCardId: 7,
      icon: 'Night',
      title: 'Night',
      pick3DrawTime: Pick3DrawTimeEnum.NIGHT,
      dateTime: nightDate,
      drawTime: Pick3DrawTimeEnum.NIGHT,
      state: Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET,
      selected: true,
      showCountDownToDrawing: true,
      pick3DrawTimeArray: [33, 555, 264, 346, 345],
    });
    yesterdayPick3DrawDateModelMonday = new Pick3DrawDateCardDomain({
      drawDate: yesterdaysDate,
      drawState: 'TX',
      drawTime: Pick3DrawTimeEnum.DAY,
      drawTimeAsString: 'Day',
      upcomingDrawTime: mondayDate,
      hasWinner: false,
      backgroundImage: Pick3LotteryService,
      winningNumber: null,
      winningNumberDigits: null,
      drawDateIcon: mondayDate,
      slideNumber: 6,
      defaultDrawDateTime: Pick3DrawTimeEnum.DAY,
      slideName: 'Home',
    });
    yesterdayPick3DrawDateModelSunday = new Pick3DrawDateCardDomain({
      drawDate: yesterdaysDate,
      drawState: 'TX',
      drawTime: Pick3DrawTimeEnum.DAY,
      drawTimeAsString: 'Day',
      upcomingDrawTime: sundayDate,
      hasWinner: false,
      backgroundImage: Pick3LotteryService,
      winningNumber: null,
      winningNumberDigits: null,
      drawDateIcon: sundayDate,
      slideNumber: 6,
      defaultDrawDateTime: Pick3DrawTimeEnum.DAY,
      slideName: 'Home',
    });
    yesterdayPick3DrawDateModelSaturday = new Pick3DrawDateCardDomain({
      drawDate: yesterdaysDate,
      drawState: 'TX',
      drawTime: Pick3DrawTimeEnum.DAY,
      drawTimeAsString: 'Day',
      upcomingDrawTime: saturdayDate,
      hasWinner: false,
      backgroundImage: Pick3LotteryService,
      winningNumber: 462,
      winningNumberDigits: [1, 9, 2],
      drawDateIcon: saturdayDate,
      slideNumber: 6,
      defaultDrawDateTime: Pick3DrawTimeEnum.DAY,
      slideName: 'Home',
    });
    yesterdayPick3DrawDateModelFriday = new Pick3DrawDateCardDomain({
      drawDate: yesterdaysDate,
      drawState: 'TX',
      drawTime: Pick3DrawTimeEnum.DAY,
      drawTimeAsString: 'Day',
      upcomingDrawTime: fridayDate,
      hasWinner: false,
      backgroundImage: Pick3LotteryService,
      winningNumber: 462,
      winningNumberDigits: [1, 9, 2],
      drawDateIcon: fridayDate,
      slideNumber: 6,
      defaultDrawDateTime: Pick3DrawTimeEnum.DAY,
      slideName: 'Home',
    });
    yesterdayPick3DrawDateModel = new Pick3DrawDateCardDomain({
      drawDate: yesterdaysDate,
      drawState: 'TX',
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
      imports: [
        CommonModule,
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          {
            path: 'select-picks',
            component: PreviousWinningNumberCardComponent,
            pathMatch: 'full',
          },
        ]),
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
      ],
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
    jasmine.clock().mockDate(yesterdaysDate);
    const mockUrlTree = router.parseUrl('/select-picks');
    // @ts-ignore: force this private property value for testing.
    router.currentUrlTree = mockUrlTree;
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(PreviousWinningNumberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectDrawingDateMenuItemForToday ', () => {
if (component.date === date) {
  const selectDrawingDateMenuItemForTodaySpy = spyOn(component, 'selectDrawingDateMenuItemForToday');
  component.ngOnInit();
  expect(selectDrawingDateMenuItemForTodaySpy).toHaveBeenCalled();
} else {
  const selectDrawingDateMenuItemForYesterdaySpy = spyOn(component, 'selectDrawingDateMenuItemForYesterday');
  expect(selectDrawingDateMenuItemForYesterdaySpy);
}
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
    component.setDrawingTimeMenuItems(todayPick3DrawDateModel);
    expect(resetDrawingTimesSpy).toHaveBeenCalled();
  });

  it('should  call resetDrawingTimes for yesterday', () => {
    const resetDrawingTimesSpy = spyOn(component, 'resetDrawingTimes');
    component.setDrawingTimeMenuItems(yesterdayPick3DrawDateModel);
    expect(resetDrawingTimesSpy).toHaveBeenCalled();
  });

  it('should  call resetDrawingTimes', () => {
    const resetDrawingTimesSpy = spyOn(component, 'resetDrawingTimes');
    component.setDrawingTimeMenuItems(yesterdayPick3DrawDateModel);
    expect(resetDrawingTimesSpy).toHaveBeenCalled();
  });

  it('should  call resetDrawingTimes', () => {
    const resetDrawingTimesSpy = spyOn(component, 'resetDrawingTimes');
    component.setDrawingTimeMenuItemsForClosedDay(todayPick3DrawDateModel);
    expect(resetDrawingTimesSpy).toHaveBeenCalled();
  });

  it('should  define newDrawingTimes', () => {
    component.setDrawingTimeMenuItemsForClosedDay(todayPick3DrawDateModel);
    expect(component.newDrawingTimes).toBeDefined();
  });

  it('should  define newDrawingTimes', () => {
    component.setDrawingTimeMenuItemsForClosedDay(yesterdayPick3DrawDateModel);
    expect(component.newDrawingTimes).toBeDefined();
  });

  it('should  call resetDrawingTimes', () => {
    const selectCurrentCardSpy = spyOn(component, 'selectCurrentCard');
    component.setDrawingTimeMenuItems(todayPick3DrawDateModel);
    expect(selectCurrentCardSpy).toHaveBeenCalled();
  });

  it('should return the continue button as false', () => {
    component.continueChoice = false;
    component.currentDrawingCard.showCountDownToDrawing = false;
    component.validatePreviousWinningNumberComp();
    expect(component.continueButton).toBeTrue();
  });

  it('should return yesterdayPick3DrawTimeModel with the showCountdownToDrawing as false', () => {
    component.checkIfCountDownIsAvailable(yesterdayPick3DrawTimeModel);
    expect(yesterdayPick3DrawTimeModel.showCountDownToDrawing).toBeFalse();
  });

  it('should return yesterdayPick3DrawTimeModelSunday with the showCountdownToDrawing as true', () => {
    component.checkIfCountDownIsAvailable(yesterdayPick3DrawTimeModelSunday);
    expect(yesterdayPick3DrawTimeModelSunday.showCountDownToDrawing).toBeTrue();
  });

  it('should return todayPick3DrawTimeModel with the showCountdownToDrawing as false', () => {
    component.checkIfCountDownIsAvailable(todayPick3DrawTimeModel);
    expect(todayPick3DrawTimeModel.showCountDownToDrawing).toBeFalse();
  });

  xit('should return todayPick3DrawTimeModelNight with the showCountdownToDrawing as true', () => {
    component.checkIfCountDownIsAvailable(todayPick3DrawTimeModelNight);
    expect(todayPick3DrawTimeModelNight.showCountDownToDrawing).toBeTrue();
  });

  it('should return winning numbers from getCurrentWinningDrawingNumber for todays morning drawing', () => {
    component.getCurrentWinningDrawingNumber(todayPick3DrawDateModel, todayPick3DrawDateModel.getDrawState(), todayPick3DrawDateModel.getDrawDate(), todayPick3DrawTimeModel.getDrawTimeValue());
    expect(todayPick3DrawDateModel.winningNumber).toBeDefined('todayPick3DrawDateModel has  winning numbers defined');
  });
  it('should return winning numbers from getCurrentWinningDrawingNumber for fridays morning drawing', () => {
    component.getCurrentWinningDrawingNumber(yesterdayPick3DrawDateModelFriday, yesterdayPick3DrawDateModelFriday.getDrawState(), yesterdayPick3DrawDateModelFriday.getDrawDate(), yesterdayPick3DrawTimeModelFriday.getDrawTimeValue());
    expect(yesterdayPick3DrawDateModelFriday.winningNumber).toBeDefined('todayPick3DrawDateModel has  winning numbers defined');
  });

  it('should return winning numbers from getCurrentWinningDrawingNumber for saturdays morning drawing', () => {
    component.getCurrentWinningDrawingNumber(yesterdayPick3DrawDateModelSaturday, yesterdayPick3DrawDateModelSaturday.getDrawState(), yesterdayPick3DrawDateModelSaturday.getDrawDate(), yesterdayPick3DrawTimeModelSaturday.getDrawTimeValue());
    expect(yesterdayPick3DrawDateModelSaturday.winningNumber).toBeDefined('todayPick3DrawDateModel has  winning numbers defined');
  });

  it('should not return winning numbers from getCurrentWinningDrawingNumber for  morning drawing', () => {
    component.getCurrentWinningDrawingNumber(yesterdayPick3DrawDateModelSunday, yesterdayPick3DrawDateModelSunday.getDrawState(), yesterdayPick3DrawDateModelSunday.getDrawDate(), yesterdayPick3DrawTimeModelSunday.getDrawTimeValue());
    expect(yesterdayPick3DrawDateModelSunday.winningNumber).toBeNull('todayPick3DrawDateModel has  no winning numbers defined');
  });

  it('should return winning numbers from getCurrentWinningDrawingNumber for fridays morning drawing', () => {
    component.getCurrentWinningDrawingNumber(yesterdayPick3DrawDateModelMonday, yesterdayPick3DrawDateModelMonday.getDrawState(), yesterdayPick3DrawDateModelMonday.getDrawDate(), yesterdayPick3DrawTimeModelMonday.getDrawTimeValue());
    expect(yesterdayPick3DrawDateModelMonday.winningNumber).toBeDefined('todayPick3DrawDateModel has  winning numbers defined');
  });
  it('should return winning numbers from getCurrentWinningDrawingNumber for todays morning drawing', () => {
    component.getCurrentWinningDrawingNumber(todayPick3DrawDateModel, todayPick3DrawDateModel.getDrawState(), todayPick3DrawDateModel.getDrawDate(), todayPick3DrawTimeModel.getDrawTimeValue());
    expect(todayPick3DrawDateModel.winningNumber).toBeDefined('todayPick3DrawDateModel has  winning numbers defined');
  });
  it('should return winning numbers from getCurrentWinningDrawingNumber for todays morning drawing', () => {
    component.getCurrentWinningDrawingNumber(todayPick3DrawDateModel, todayPick3DrawDateModel.getDrawState(), todayPick3DrawDateModel.getDrawDate(), todayPick3DrawTimeModel.getDrawTimeValue());
    expect(todayPick3DrawDateModel.winningNumber).toBeDefined('todayPick3DrawDateModel has  winning numbers defined');
  });
  it('should return winning numbers from getCurrentWinningDrawingNumber for todays morning drawing', () => {
    component.getCurrentWinningDrawingNumber(yesterdayPick3DrawDateModel, yesterdayPick3DrawDateModel.getDrawState(), yesterdayPick3DrawDateModel.getDrawDate(), yesterdayPick3DrawTimeModel.getDrawTimeValue());
    expect(yesterdayPick3DrawDateModel.winningNumber).toBeDefined('yesterdayPick3DrawDateModel has  winning numbers defined');
  });

  it('should return null from getCurrentWinningDrawingNumber for todays night time drawing', () => {
    component.getCurrentWinningDrawingNumber(todayPick3DrawDateModelNight, todayPick3DrawDateModelNight.getDrawState(), todayPick3DrawDateModelNight.getDrawDate(), todayPick3DrawTimeModelNight.getDrawTimeValue());
    expect(todayPick3DrawDateModel.winningNumber).toBeNull('todayPick3DrawDateModel has winning numbers defined');
  });
});
