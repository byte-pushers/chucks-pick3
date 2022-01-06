import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DrawTimeService} from '../../services/draw-time.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import * as BytePushers from 'bytepushers-js-core';
import {
  DAY_DRAW_TIME_KEY,
  EVENING_DRAW_TIME_KEY,
  MORNING_DRAW_TIME_KEY,
  NIGHT_DRAW_TIME_KEY,
  Pick3DrawTimeEnum
} from '../../models/pick3-draw-time.enum';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {CardContextService} from '../../services/card-context.service';
import {DrawStateService} from '../../services/draw-state.service';
import {DrawDateService} from '../../services/draw-date.service';
import {AppService} from '../../app.service';
import {Pick3DrawTime} from '../../models/pick3-draw-time';
import {NavigationEnum} from '../../models/navigate.enum';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'generate-picks-card',
  templateUrl: './previous-winning-number-card.component.html',
  styleUrls: ['./previous-winning-number-card.component.scss'],
})
export class PreviousWinningNumberCardComponent implements OnInit, OnDestroy {
  public drawTimes: Array<Pick3DrawTimeCard> = [];
  public pick3StateLottery: Pick3StateLottery;
  public currentDate = new Date().getDate();
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
  public pick3Id: number;
  initializedPick3DrawTime: any;
  public currentDrawingCard: Pick3DrawTimeCard;
  private pick3DrawTimeCardSubscription: Subscription;
  private someDateTime: Date = new Date();
  private componentState;
  constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
              private cardContextService: CardContextService,
              private drawTimeService: DrawTimeService,
              private drawDateService: DrawDateService,
              private appService: AppService,
              private drawStateService: DrawStateService,
              private router: Router) {
    this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
    this.componentState = 'instantiated';

  }


  ngOnInit(): void {
    const someDateTime = new Date();
    const yesterdaysDate: Date = new Date(someDateTime.getFullYear(), someDateTime.getMonth() + 1 - 1, someDateTime.getDate() - 1, someDateTime.getHours());
    const today: HTMLElement = document.getElementById('today');
    const yesterday: HTMLElement = document.getElementById('yesterday');
    /* istanbul ignore next */
    const passedDate = this.routerState?.currentDay.getDate();
    /* istanbul ignore next */
    const pick3DrawTime = this.appService.getDrawTime(this.routerState?.currentDay);
    /* istanbul ignore next */
    if (this.currentDateDay !== passedDate) {
      this.selectDrawingDateMenuItemForYesterday(yesterday, today);
    } else {
      this.selectDrawingDateMenuItemForToday(today, yesterday);
    }

    /* istanbul ignore next */
    this.drawTimes.some(drawTime => {
      const drawTimeHour = drawTime.getDateTime().getHours();
      const currentHour = new Date().getHours();
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

  ngOnDestroy() {
  }
  /* istanbul ignore next */
  public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
    if (pick3DrawTimeCard) {
      this.drawTimes.forEach(drawTime => {
        if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
          drawTime.setSelected(false);
        } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
          drawTime.setSelected(true);
          this.currentDrawingCard = pick3DrawTimeCard;
          console.log(this.currentDrawingCard);
          this.drawDateService.dispatchCurrentDrawDateCardEvent(pick3DrawTimeCard);
          this.validatePreviousWinningNumberComp();
        }
      });
    }
  }

  public setDrawingTimeMenuItems(targetCurrentDate: Date, slideNumber: number): void {
    const currentPick3DrawTimeCard = this.appService.getPick3DrawTimeCards(slideNumber);
    if (BytePushers.DateUtility.isSameDate(targetCurrentDate, new Date())) {
      this.drawTimes = currentPick3DrawTimeCard;
      this.resetDrawingTimes();
      for (const drawTime of this.drawTimes) {
        this.newDrawingTimes.push(drawTime.getDrawTimeValue());
      }
      /* istanbul ignore if */
      if (this.router.url === '/select-picks') {
        this.selectCurrentCard(this.drawTimes);
      }
    } else {
      this.drawTimes = currentPick3DrawTimeCard;
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

  /* private sortDrawTimes(drawTimes) {
       const currentHour = new Date().getHours();
       for (const drawTime of drawTimes) {
           const index = drawTimes.indexOf(drawTime);
           if (currentHour <= drawTime.getPick3DrawTime().getDateTime().getHours()) {
               drawTimes.splice(index, index);
           }
       }
       return drawTimes;
   }*/
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
    yesterday.style.backgroundColor = '#2fdf75';
    today.style.backgroundColor = '#e5e5e5';
    this.appService.pick3CardId = 6;
    this.setDrawingTimeMenuItems(yesterdaysDate, 6);
  }

  public selectDrawingDateMenuItemForToday(today: any, yesterday: any): void {
    const currentDate = new Date();
    today.style.backgroundColor = '#2fdf75';
    yesterday.style.backgroundColor = '#e5e5e5';
    this.appService.pick3CardId = 7;
    this.setDrawingTimeMenuItems(currentDate, 7);
  }
  /* istanbul ignore next */
  public setDrawDateButtons(drawDateButtonString: any): void {
    const drawDateButtonValue = NavigationEnum.retrieveNavigation(drawDateButtonString);
    this.drawStateService.generateNavigationChoice = drawDateButtonValue;
    this.drawStateService.viewNavigationChoice = drawDateButtonValue;
  }

  /* istanbul ignore next */
  logForm(): void {
    console.log(this.continueChoice);
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
}
