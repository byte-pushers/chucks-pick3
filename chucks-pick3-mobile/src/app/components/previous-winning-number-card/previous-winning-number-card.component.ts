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

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'generate-picks-card',
    templateUrl: './previous-winning-number-card.component.html',
    styleUrls: ['./previous-winning-number-card.component.scss'],
})
export class PreviousWinningNumberCardComponent implements OnInit, OnDestroy {
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    public pick3StateLottery: Pick3StateLottery;
    private componentState;
    public currentDate = new Date().getDate();
    defaultDrawingTimes = [MORNING_DRAW_TIME_KEY, DAY_DRAW_TIME_KEY, EVENING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY];
    continueChoice: any;
    continueButton = true;
    routerState = this.router.getCurrentNavigation().extras.state;
    newDrawingTimes: any[] = [];
    currentDateDay: number = new Date().getDate();
    currentDateMonth: number = new Date().getMonth() + 1;
    currentDateYear: number = new Date().getFullYear();
    fullDate: any = this.currentDateMonth + '/' + this.currentDateDay + '/' + this.currentDateYear;
    private drawDateSubscription: Subscription;
    private someDateTime: Date = new Date();
    private currentDrawingCard: Pick3DrawTimeCard;

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
        const yesterdaysDate: Date = new Date(this.currentDateYear, this.currentDateMonth, this.currentDateDay - 1, this.someDateTime.getHours());
        const today: HTMLElement = document.getElementById('today');
        const yesterday: HTMLElement = document.getElementById('yesterday');
        const passedDate = this.routerState?.currentDay.getDate();
        if (this.currentDateDay !== passedDate) {
            this.selectDrawingDateMenuItemForYesterday(yesterday, today);
        } else {
            this.selectDrawingDateMenuItemForToday(today, yesterday);
        }
    }

    ngOnDestroy() {
    }

    public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
        if (pick3DrawTimeCard) {
            this.drawTimes.forEach(drawTime => {
                if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                    drawTime.setSelected(false);
                } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                    drawTime.setSelected(true);
                    this.currentDrawingCard = pick3DrawTimeCard;
                    this.drawDateService.dispatchCurrentDrawDateCardEvent(pick3DrawTimeCard);

                }
            });
        }
    }

    public setDrawingTimeMenuItems(targetCurrentDate: Date, slideNumber: number): void {
        const currentPick3DrawTimeCard = this.appService.getPick3DrawTimeCards(slideNumber);
        if (BytePushers.DateUtility.isSameDate(targetCurrentDate, new Date())) {
            this.drawTimes = currentPick3DrawTimeCard;
            this.resetDrawingTimes();
            const sortedDrawTimes = this.sortDrawTimes(this.drawTimes);
            for (const drawTime of sortedDrawTimes) {
                this.newDrawingTimes.push(drawTime.getDrawTimeValue());
            }
            this.selectCurrentCard(this.drawTimes);
        } else {
            this.drawTimes = currentPick3DrawTimeCard;
            this.resetDrawingTimes();
            for (const drawTime of this.drawTimes) {
                this.newDrawingTimes.push(drawTime.getDrawTimeValue());
                this.newDrawingTimes.splice(0, this.newDrawingTimes.length, ...this.defaultDrawingTimes);
            }
            this.selectCurrentCard(this.drawTimes);
        }
    }

    private sortDrawTimes(drawTimes) {
        const currentHour = new Date().getHours();
        for (const drawTime of drawTimes) {
            const index = drawTimes.indexOf(drawTime);
            if (currentHour <= drawTime.getPick3DrawTime().getDateTime().getHours()) {
                drawTimes.splice(index, index);
            }
        }
        return drawTimes;
    }

    private resetDrawingTimes(): void {
        if (this.newDrawingTimes !== null && this.newDrawingTimes !== undefined) {
            this.newDrawingTimes.length = 0;
        }

    }

    public selectDrawingDateMenuItemForYesterday(yesterday: any, today: any): void {
        const someDateTime = new Date();
        const yesterdaysDate: Date = new Date(this.currentDateYear, this.currentDateMonth - 1, this.currentDateDay - 1, someDateTime.getHours());
        yesterday.style.backgroundColor = '#2fdf75';
        today.style.backgroundColor = '#e5e5e5';
        this.setDrawingTimeMenuItems(yesterdaysDate, 6);
    }

    public selectDrawingDateMenuItemForToday(today: any, yesterday: any): void {
        const currentDate = new Date();
        today.style.backgroundColor = '#2fdf75';
        yesterday.style.backgroundColor = '#e5e5e5';
        this.setDrawingTimeMenuItems(currentDate, 7);
    }

    public enableContinue() {
        const element = document.getElementById('continueButton');
        if (this.continueButton === true) {
            this.continueButton = false;
            element.classList.add('continue-btn-enabled');
        }


    }

    public submitGenerate(generateDisplay: any, continueDisplay: any): void {
        continueDisplay.style.display = 'block';
        generateDisplay.style.display = 'none';

        this.drawStateService.generateNavigationChoice = 4;
        this.drawStateService.viewNavigationChoice = 4;
    }


    logForm(): void {
        console.log(this.continueChoice);
    }

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
}
