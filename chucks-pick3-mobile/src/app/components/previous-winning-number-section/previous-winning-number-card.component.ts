import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawTimeService } from '../../services/draw-time.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pick3DrawTimeCard } from '../../models/pick3-draw-time-card';
import { Pick3StateLottery } from '../../models/pick3-state-lottery';
import * as BytePushers from 'bytepushers-js-core';
import { DAY_DRAW_TIME_KEY, EVENING_DRAW_TIME_KEY, MORNING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY, Pick3DrawTimeEnum } from '../../models/pick3-draw-time.enum';
import { Pick3WebScrapingProviderService } from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import { CardContextService } from '../../services/card-context.service';
import { DrawStateService } from '../../services/draw-state.service';
import { DrawDateService } from '../../services/draw-date.service';
import { AppService } from '../../app.service';
import { NavigationEnum } from '../../models/navigate.enum';
import { StateService } from '../../services/state.service';
import { SelectPicksService } from '../../services/select-picks.service';
import { GeneratePicksService } from '../../services/generate-picks.service';
import { Pick3DrawDateCard } from '../../models/pick3-draw-date-card';

@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'generate-picks-card',
  templateUrl: './previous-winning-number-card.component.html',
  styleUrls: ['./previous-winning-number-card.component.scss'],
})
export class PreviousWinningNumberCardComponent implements OnInit, OnDestroy {
  public drawTimes: Array<Pick3DrawTimeCard> = [];
  public pick3StateLottery: Pick3StateLottery;
  public date = new Date();
  public defaultDrawingTimes = [MORNING_DRAW_TIME_KEY, DAY_DRAW_TIME_KEY, EVENING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY];
  public continueChoice: any;
  public continueButton = true;
  public routerState = this.router.getCurrentNavigation().extras.state;
  public newDrawingTimes: any[] = [];

  public currentDateDay: number = new Date().getDate();
  public currentDateMonth: number = new Date().getMonth() + 1;
  public currentDateYear: number = new Date().getFullYear();
  public fullDate: any = this.currentDateMonth + '/' + this.currentDateDay + '/' + this.currentDateYear;
  public pick3CardIdSubscription: Subscription;
  public currentDrawingCard: Pick3DrawTimeCard;
  private componentState;

  constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService, private cardContextService: CardContextService, private drawTimeService: DrawTimeService, private drawDateService: DrawDateService, private selectPicksService: SelectPicksService, private generatePicksService: GeneratePicksService, private appService: AppService, private stateDrawDate: StateService, private drawStateService: DrawStateService, private router: Router) {
    this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
    this.componentState = 'instantiated';
  }

  ngOnInit(): void {
    const today: HTMLElement = document.getElementById('today');
    const yesterday: HTMLElement = document.getElementById('yesterday');
    /* istanbul ignore next */
    const passedDate: Date = this.routerState?.currentDay;
    /* istanbul ignore next */
    if (this.currentDateDay !== passedDate.getDate()) {
      this.selectDrawingDateMenuItemForYesterday(yesterday, today);
    } else {
      this.selectDrawingDateMenuItemForToday(today, yesterday);
    }

    /* istanbul ignore next */
    this.drawTimes.some((drawTime) => {
      const drawTimeHour = drawTime.getDateTime().getHours();
      drawTime.setPick3DrawTime(this.appService.getDrawTime(this.routerState?.currentDay));
      this.selectDrawingTimeCard(drawTime);
      this.continueChoice = drawTime;
      if (this.routerState?.currentDay.getHours() === drawTimeHour) {
        this.selectDrawingTimeCard(drawTime);
        return true;
      }

      return false;
    });

    /* istanbul ignore next */
    this.pick3CardIdSubscription = this.appService.getPick3DrawCardId$().subscribe((slideNumber: number) => {
      /* istanbul ignore if */
      if (this.router.url === '/home') {
        this.continueButton = true;
        /* istanbul ignore if */
        if (slideNumber === 6) {
          this.selectDrawingDateMenuItemForYesterday(yesterday, today);
          /* istanbul ignore if */
        } else if (slideNumber === 7) {
          this.selectDrawingDateMenuItemForToday(today, yesterday);
        }
      }
    });
  }

  ngOnDestroy() {}

  /* istanbul ignore next */
  public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
    if (pick3DrawTimeCard) {
      this.drawTimes.forEach((drawTime) => {
        if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
          drawTime.setSelected(false);
        } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
          drawTime.setSelected(true);
          this.currentDrawingCard = pick3DrawTimeCard;

          const pick3DrawDateCard = this.appService.getPreviousWinningNumber(pick3DrawTimeCard.getDateTime(), pick3DrawTimeCard.getPick3DrawTime());
          pick3DrawDateCard.setDrawTime(pick3DrawTimeCard.getDrawTimeValue());
          pick3DrawDateCard.setIcon(pick3DrawTimeCard.getIcon());
          const selectedPick3DrawDateCard = this.getCurrentWinningDrawingNumber(pick3DrawDateCard, pick3DrawDateCard.getDrawState(), pick3DrawDateCard.getDrawDate(), pick3DrawTimeCard.getDrawTimeValue());
          const selectedPick3DrawTimeCard = this.checkIfCountDownIsAvailable(pick3DrawTimeCard);

          this.selectPicksService.setSelectedPick3DrawTimeCard(selectedPick3DrawTimeCard);
          this.selectPicksService.setSelectedPick3DrawDateCard(selectedPick3DrawDateCard);
          this.validatePreviousWinningNumberComp();
        }
      });
    } else {
      this.continueButton = false;
    }
  }

  public setDrawingTimeMenuItems(pick3DrawDateCard): void {
    const targetCurrentDate = pick3DrawDateCard.getDrawDate();
    if (BytePushers.DateUtility.isSameDate(targetCurrentDate, new Date())) {
      this.drawTimes = this.appService.getPick3DrawTimeCards(pick3DrawDateCard.slideNumber);
      this.resetDrawingTimes();
      for (const drawTime of this.drawTimes) {
        this.newDrawingTimes.push(drawTime.getDrawTimeValue());
      }
      /* istanbul ignore if */
      if (this.router.url === '/select-picks') {
        this.selectCurrentCard(this.drawTimes);
      }
    } else {
      this.drawTimes = this.appService.getPick3DrawTimeCards(pick3DrawDateCard.slideNumber);
      this.resetDrawingTimes();
      for (const drawTime of this.drawTimes) {
        this.newDrawingTimes.push(drawTime.getDrawTimeValue());
        this.newDrawingTimes.splice(0, this.newDrawingTimes.length, ...this.defaultDrawingTimes);
      }
      if (this.router.url === '/select-picks') {
        this.selectCurrentCard(this.drawTimes);
      }
    }
  }

  public setDrawingTimeMenuItemsForClosedDay(pick3DrawDateCard): void {
    this.continueButton = false;
    const targetCurrentDate = pick3DrawDateCard.getDrawDate();
    if (BytePushers.DateUtility.isSameDate(targetCurrentDate, new Date())) {
      this.drawTimes = this.appService.getPick3DrawTimeCards(pick3DrawDateCard.slideNumber);
      this.resetDrawingTimes();
      for (const drawTime of this.drawTimes) {
        drawTime.setDrawTime(null);
        drawTime.showCountDownToDrawing = true;
        this.newDrawingTimes.push(drawTime.getDrawTimeValue());
      }
      /* istanbul ignore if */
      if (this.router.url === '/select-picks') {
        this.selectCurrentCard(this.drawTimes);
      }
    } else {
      this.drawTimes = this.appService.getPick3DrawTimeCards(pick3DrawDateCard.slideNumber);
      this.resetDrawingTimes();
      for (const drawTime of this.drawTimes) {
        drawTime.showCountDownToDrawing = true;
        this.newDrawingTimes.push(drawTime.getDrawTimeValue());
        this.newDrawingTimes.splice(0, this.newDrawingTimes.length, ...this.defaultDrawingTimes);
      }
      /* istanbul ignore next */
      if (this.router.url === '/select-picks') {
        this.selectCurrentCard(this.drawTimes);
      }
    }
  }

  /* istanbul ignore next */
  public resetDrawingTimes(): void {
    if (this.newDrawingTimes !== null && this.newDrawingTimes !== undefined) {
      this.newDrawingTimes.length = 0;
    }
  }

  /* istanbul ignore next */
  public selectDrawingDateMenuItemForYesterday(yesterday: any, today: any): void {
    const someDateTime = new Date();
    const yesterdaysDate: Date = new Date(someDateTime.getFullYear(), someDateTime.getMonth() + 1 - 1, someDateTime.getDate() - 1, someDateTime.getHours());
    const pick3DrawTime = this.appService.getDrawTime(yesterdaysDate);
    const previousPick3DrawDateCard = this.appService.getPreviousWinningNumber(yesterdaysDate, pick3DrawTime);

    this.selectPicksService.setSelectedPick3DrawDateCard(previousPick3DrawDateCard);
    yesterday.style.backgroundColor = '#2fdf75';
    today.style.backgroundColor = '#e5e5e5';
    if (this.isLotteryClosed(yesterdaysDate)) {
      this.setDrawingTimeMenuItemsForClosedDay(previousPick3DrawDateCard);
    } else {
      this.setDrawingTimeMenuItems(previousPick3DrawDateCard);
    }
  }

  public selectDrawingDateMenuItemForToday(today: any, yesterday: any): void {
    const currentDate = new Date();
    today.style.backgroundColor = '#2fdf75';
    yesterday.style.backgroundColor = '#e5e5e5';
    const pick3DrawTime = this.appService.getDrawTime(currentDate);
    const todaysPick3DrawDateCard = this.appService.getPreviousWinningNumber(currentDate, pick3DrawTime);

    this.selectPicksService.setSelectedPick3DrawDateCard(todaysPick3DrawDateCard);

    if (this.isLotteryClosed(currentDate)) {
      this.setDrawingTimeMenuItems(todaysPick3DrawDateCard);
    } else {
      this.setDrawingTimeMenuItems(todaysPick3DrawDateCard);
    }
  }

  /* istanbul ignore next */
  public setDrawDateButtons(drawDateButtonString: any): void {
    const drawDateButtonValue = NavigationEnum.retrieveNavigation(drawDateButtonString);
    this.drawStateService.generateNavigationChoice = drawDateButtonValue;
    this.drawStateService.viewNavigationChoice = drawDateButtonValue;
  }

  /* istanbul ignore next */
  submitForm(): void {
    this.generatePicksService.dispatchGeneratePicksDrawDateCardEvent(this.currentDrawingCard);
  }

  /* istanbul ignore next */
  private selectCurrentCard(drawTimes) {
    if (this.currentDrawingCard) {
      for (const drawTime of drawTimes) {
        if (this.currentDrawingCard.getDrawTime() === drawTime.getDrawTime()) {
          this.currentDrawingCard = drawTime;
          this.selectDrawingTimeCard(this.currentDrawingCard);
        }
      }
    }
  }

  private validatePreviousWinningNumberComp() {
    if (this.currentDrawingCard.showCountDownToDrawing === false && this.continueChoice) {
      this.continueButton = false;
    } else {
      this.continueButton = true;
    }
  }

  /* istanbul ignore next */
  public isLotteryClosed(date: Date): boolean {
    const dateName = this.stateDrawDate.retrieveDay(date);
    return this.stateDrawDate.getClosedDates(this.pick3StateLottery.getState()).includes(dateName);
  }

  private checkIfCountDownIsAvailable(pick3DrawTimeCard: Pick3DrawTimeCard) {
    const currentDate = new Date();
    if (pick3DrawTimeCard.getDateTime().getHours() <= currentDate.getHours() && this.isLotteryClosed(pick3DrawTimeCard.getDateTime()) === false) {
      pick3DrawTimeCard.showCountDownToDrawing = false;
    } else {
      pick3DrawTimeCard.showCountDownToDrawing = true;
    }
    return pick3DrawTimeCard;
  }

  private getCurrentWinningDrawingNumber(pick3DrawDateCard: Pick3DrawDateCard, drawState: string, pick3DrawDateTime: Date, pick3DrawTimeType: Pick3DrawTimeEnum): Pick3DrawDateCard {
    this.pick3WebScrappingService.getCurrentWinningDrawingNumber(drawState, pick3DrawDateTime, pick3DrawTimeType).then(
      (winningNumber: any) => {
        pick3DrawDateCard.setWinningNumber(winningNumber?.number);
      },
      (error) => {
        console.log(error);
      }
    );
    return pick3DrawDateCard;
  }
}
