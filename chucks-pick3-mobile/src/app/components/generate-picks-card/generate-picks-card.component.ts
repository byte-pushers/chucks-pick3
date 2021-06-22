import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DrawTimeService} from '../../services/draw-time.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
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

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'generate-picks-card',
    templateUrl: './generate-picks-card.component.html',
    styleUrls: ['./generate-picks-card.component.scss'],
})
export class GeneratePicksCardComponent implements OnInit, OnDestroy {
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    public pick3StateLottery: Pick3StateLottery;
    private subscription: Subscription;
    private componentState;
    public currentDate = new Date().getDate();
    defaultDrawingTimes = [MORNING_DRAW_TIME_KEY, DAY_DRAW_TIME_KEY, EVENING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY];
    generateChoice: any;
    continueChoice: any;
    continueButton = true;

    newDrawingTimes: any[] = [];
    currentDateDay: number = new Date().getDate();
    currentDateMonth: number = new Date().getMonth() + 1;
    currentDateYear: number = new Date().getFullYear();
    fullDate: any = this.currentDateMonth + '/' + this.currentDateDay + '/' + this.currentDateYear;

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private cardContextService: CardContextService,
                private drawTimeService: DrawTimeService) {
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
        this.componentState = 'instantiated';

    }

    ngOnInit(): void {
        this.componentState = 'initializing';
        this.cardContextService.context$.subscribe(context => {
            this.drawTimes.splice(0, this.drawTimes.splice.length, ...context.drawTimes);
            console.log(context.drawTimes);
            if (this.componentState === 'initializing') {
                const currentDrawingTime = this.drawTimeService.getCurrentDrawTimeCard();
                this.selectDrawingTimeCard(currentDrawingTime);
            }
        });
        this.componentState = 'initialized';
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.drawTimes = [];
        this.pick3StateLottery = null;
    }

    public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
        this.drawTimes.forEach(drawTime => {
            if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(false);
            } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(true);
                this.drawTimeService.setCurrentDrawTimeCard(drawTime);
            }
        });
    }

    public setDrawingTimeMenuItems(targetCurrentDate: Date): void {

        if (BytePushers.DateUtility.isSameDate(targetCurrentDate, new Date())) {
            this.resetDrawingTimes();
            for (const drawTime of this.drawTimes) {
                this.selectDrawingTimeCard(drawTime);
            }
        } else {
            this.resetDrawingTimes();
            this.newDrawingTimes.splice(0, this.newDrawingTimes.length, ...this.defaultDrawingTimes);
        }

    }

    private resetDrawingTimes(): void {
        if (this.newDrawingTimes !== null && this.newDrawingTimes !== undefined) {
            this.newDrawingTimes.length = 0;
        }

    }

    public selectDrawingDateMenuItemForYesterday(yesterday: any, today: any): void {
        yesterday.style.backgroundColor = '#2fdf75';
        today.style.backgroundColor = '#e5e5e5';
    }

    public selectDrawingDateMenuItemForToday(today: any, yesterday: any): void {
        today.style.backgroundColor = '#2fdf75';
        yesterday.style.backgroundColor = '#e5e5e5';
    }

    public selectDrawingDateMenuItemForTomorrow(tomorrow: any, today: any) {
        tomorrow.style.backgroundColor = '#2fdf75';
        today.style.backgroundColor = '#e5e5e5';
    }

    public selectTomorrowDrawingDate(tomorrow: any, today: any): void {
        const date = new Date();

        const tomorrowFullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0);
        console.log(tomorrowFullDate);
        this.setDrawingTimeMenuItems(tomorrowFullDate);
        this.selectDrawingDateMenuItemForTomorrow(tomorrow, today);
    }

    public selectTodayDrawingDate(today: any, tomorrow: any): void {
        const date = new Date();

        const todayFullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        console.log(todayFullDate);
        this.setDrawingTimeMenuItems(todayFullDate);
        this.selectDrawingDateMenuItemForToday(tomorrow, today);
    }

    public submitGenerate(generateDisplay: any, continueDisplay: any): void {
        continueDisplay.style.display = 'block';
        generateDisplay.style.display = 'none';
    }

    public showGeneratePage(continueDisplay: any, generateDisplay: any): void {
        continueDisplay.style.display = 'none';
        generateDisplay.style.display = 'block';
    }

    public showGenerateBackButton(secondBtn: any, firstBtn: any): void {
        secondBtn.style.display = 'block';
        firstBtn.style.display = 'none';
    }

    public showContinueBackButton(firstBtn: any, secondBtn: any): void {
        firstBtn.style.display = 'block';
        secondBtn.style.display = 'none';
    }


    logForm(): void {
        console.log(this.continueChoice);
    }
}
