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
  const sundayDate = new Date(2021, 11, 7, date.getTime());
  const yesterdaysDate: Date = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  let component: PreviousWinningNumberCardComponent;
  let fixture: ComponentFixture<PreviousWinningNumberCardComponent>;
  let router: Router;
  let todayModel;
  let yesterdayModel;
  let todayPick3DrawTimeModelNight;
  let todayPick3DrawTimeModel;
  let yesterdayPick3DrawTimeModel;
  let drawStateService = DrawStateService;
  beforeEach(async(() => {
    todayModel = new Pick3DrawDateCardDomain({
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
    const mockUrlTree = router.parseUrl('/select-picks');
    // @ts-ignore: force this private property value for testing.
    router.currentUrlTree = mockUrlTree;
    router = TestBed.get(Router);
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
    component.setDrawingTimeMenuItems(todayModel);
    expect(resetDrawingTimesSpy).toHaveBeenCalled();
  });

  it('should  call resetDrawingTimes for yesterday', () => {
    const resetDrawingTimesSpy = spyOn(component, 'resetDrawingTimes');
    component.setDrawingTimeMenuItems(yesterdayModel);
    expect(resetDrawingTimesSpy).toHaveBeenCalled();
  });

  it('should  call resetDrawingTimes', () => {
    const resetDrawingTimesSpy = spyOn(component, 'resetDrawingTimes');
    component.setDrawingTimeMenuItems(yesterdayModel);
    expect(resetDrawingTimesSpy).toHaveBeenCalled();
  });

  it('should  call resetDrawingTimes', () => {
    const resetDrawingTimesSpy = spyOn(component, 'resetDrawingTimes');
    component.setDrawingTimeMenuItemsForClosedDay(todayModel);
    expect(resetDrawingTimesSpy).toHaveBeenCalled();
  });

  it('should  define newDrawingTimes', () => {
    component.setDrawingTimeMenuItemsForClosedDay(todayModel);
    expect(component.newDrawingTimes).toBeDefined();
  });

  it('should  define newDrawingTimes', () => {
    component.setDrawingTimeMenuItemsForClosedDay(yesterdayModel);
    expect(component.newDrawingTimes).toBeDefined();
  });

  it('should  call resetDrawingTimes', () => {
    const selectCurrentCardSpy = spyOn(component, 'selectCurrentCard');
    component.setDrawingTimeMenuItems(todayModel);
    expect(selectCurrentCardSpy).toHaveBeenCalled();
  });

  it('should return the continue button as false', () => {
    component.continueChoice = false;
    component.currentDrawingCard.showCountDownToDrawing = false;
    component.validatePreviousWinningNumberComp();
    expect(component.continueButton).toBeTrue();
  });

  it('should return yesterdayModel with the showCountdownToDrawing as false', () => {
    component.checkIfCountDownIsAvailable(yesterdayPick3DrawTimeModel);
    expect(yesterdayPick3DrawTimeModel.showCountDownToDrawing).toBeFalse();
  });

  it('should return model with the showCountdownToDrawing as false', () => {
    component.checkIfCountDownIsAvailable(todayPick3DrawTimeModel);
    expect(todayPick3DrawTimeModel.showCountDownToDrawing).toBeFalse();
  });

  it('should return nightModel with the showCountdownToDrawing as true', () => {
    component.checkIfCountDownIsAvailable(todayPick3DrawTimeModelNight);
    expect(todayPick3DrawTimeModelNight.showCountDownToDrawing).toBeTrue();
  });
});
