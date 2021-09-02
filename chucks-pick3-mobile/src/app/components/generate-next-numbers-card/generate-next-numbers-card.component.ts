import {Component, OnInit} from '@angular/core';
import * as BytePushers from 'bytepushers-js-core';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {DrawDateService} from '../../services/draw-date.service';
import {DAY_DRAW_TIME_KEY, EVENING_DRAW_TIME_KEY, MORNING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY} from '../../models/pick3-draw-time.enum';

@Component({
    selector: 'app-generate-next-numbers-card',
    templateUrl: './generate-next-numbers-card.component.html',
    styleUrls: ['./generate-next-numbers-card.component.scss'],
})
export class GenerateNextNumbersCardComponent implements OnInit {
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    newDrawingTimes: any[] = [];
    currentDateDay: number = new Date().getDate();
    currentDateMonth: number = new Date().getMonth() + 1;
    currentDateYear: number = new Date().getFullYear();
    fullDate: any = this.currentDateMonth + '/' + this.currentDateDay + '/' + this.currentDateYear;

    defaultDrawingTimes = [MORNING_DRAW_TIME_KEY, DAY_DRAW_TIME_KEY, EVENING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY];
    generateChoice: any;
    constructor(private drawDateService: DrawDateService) {
    }

    ngOnInit() {
    }

    public selectTomorrowGenerateDrawingDate(tomorrow: any, today: any): void {
        const date = new Date();

        const tomorrowFullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0);
        tomorrow.style.backgroundColor = '#2fdf75';
        today.style.backgroundColor = '#e5e5e5';
        this.setDrawingTimeMenuItems(tomorrowFullDate);
    }

    public selectTodayGenerateDrawingDate(today: any, tomorrow: any): void {
        const date = new Date();

        const todayFullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        today.style.backgroundColor = '#2fdf75';
        tomorrow.style.backgroundColor = '#e5e5e5';
        this.setDrawingTimeMenuItems(todayFullDate);

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

    public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
        this.drawTimes.forEach(drawTime => {
            if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(false);
            } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(true);
                // pick3DrawTimeCard.showCountDownToDrawing = false;

                this.drawDateService.dispatchCurrentDrawDateCardEvent(pick3DrawTimeCard);

            }
        });
    }

    private resetDrawingTimes(): void {
        if (this.newDrawingTimes !== null && this.newDrawingTimes !== undefined) {
            this.newDrawingTimes.length = 0;
        }

    }
}
