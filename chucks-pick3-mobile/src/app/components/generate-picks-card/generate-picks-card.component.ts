import {Component, Input, OnInit} from '@angular/core';
import {DrawTimeService} from '../../services/draw-time.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
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

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'generate-picks-card',
    templateUrl: './generate-picks-card.component.html',
    styleUrls: ['./generate-picks-card.component.scss'],
})
export class GeneratePicksCardComponent implements OnInit {
    @Input() defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    defaultDrawingTimes = [MORNING_DRAW_TIME_KEY, DAY_DRAW_TIME_KEY, EVENING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY];
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    public pick3StateLottery: Pick3StateLottery;
    state$: Observable<object>;
    newDrawingTimes: any[] = [];
    currentDateDay: number = new Date().getDate();
    currentDateMonth: number = new Date().getMonth() + 1;
    currentDateYear: number = new Date().getFullYear();
    fullDate: any = this.currentDateMonth + '/' + this.currentDateDay + '/' + this.currentDateYear;
    generateChoice: any;
    continueChoice: any;
    continueButton = true;

    constructor(public activatedRoute: ActivatedRoute,
                private drawTimeService: DrawTimeService) {

    }

    ngOnInit(): void {
        this.state$ = this.activatedRoute.paramMap
            .pipe(map(() => window.history.state));
        this.selectDrawingTimeCard(window.history.state);
    }

    public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
        this.drawTimes.forEach(drawTime => {
            if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(false);
            } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(true);
                console.log(pick3DrawTimeCard);
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
