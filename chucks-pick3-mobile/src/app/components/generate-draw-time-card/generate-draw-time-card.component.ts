import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pick3DrawDateCard} from '../../models/pick3-draw-date-card';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {
    DAY_DRAW_TIME_KEY,
    EVENING_DRAW_TIME_KEY,
    MORNING_DRAW_TIME_KEY,
    NIGHT_DRAW_TIME_KEY,
    Pick3DrawTimeEnum
} from '../../models/pick3-draw-time.enum';
import {Pick3DrawTime} from '../../models/pick3-draw-time';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import * as BytePushers from 'bytepushers-js-core';
import {IonicToastNotificationService} from '../../services/ionic-toast-notification.service';
import {I18nService} from '../../services/i18n.service';
import {TranslateService} from '@ngx-translate/core';
import {registerLocaleData} from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import {Observable, of, Subscription} from "rxjs";
import {Pick3DrawDateCardDomain} from "../../models/pick3-draw-date-card.domain";

@Component({
    selector: 'app-generate-draw-time-card',
    templateUrl: './generate-draw-time-card.component.html',
    styleUrls: ['./generate-draw-time-card.component.scss'],
})
export class GenerateDrawTimeCardComponent implements OnInit, OnDestroy {
    public data = {
        drawState: 'card.state.title',
        drawStateBackgroundImageUrl: '',
        drawingTimeIcon: 'morning-icon',
        drawingTime: 'draw.time.enum.morning',
        drawingDate: new Date(),
        winningNumber: {
            digit1: 0,
            digit2: 2,
            digit3: 3
        }
    };
    public showCountDownToDrawing =  false;
    private defaultDrawingTimes = [MORNING_DRAW_TIME_KEY, DAY_DRAW_TIME_KEY, EVENING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY];
    public drawingTimes = [];
    private pick3StateLottery: Pick3StateLottery;
    generateChoice: any;
    continueChoice: any;
    continueButton = true;
    private selectedDrawingSubscription: Subscription;

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                public toastService: IonicToastNotificationService,
                public i18nService: I18nService,
                public translateService: TranslateService) {
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
    }

    ngOnInit() {
        document.getElementById('generate').style.display = 'none';
        registerLocaleData(localeEsMx, 'es-MX');
        registerLocaleData(localeEnUS, 'en-US');

        this.selectedDrawingSubscription = of(window.history.state.selectedDrawing).subscribe(selectedDrawing => {
            selectedDrawing = new Pick3DrawDateCardDomain(selectedDrawing);

            this.translateService.get(this.pick3StateLottery.getStateName()).subscribe(someDrawState => {
                this.data.drawState = someDrawState;
            });
            this.data.drawStateBackgroundImageUrl = selectedDrawing.getBackgroundImage();
            this.data.drawingTimeIcon = selectedDrawing.getDrawDateIcon();
            this.data.drawingTime = Pick3DrawTimeEnum.toString(selectedDrawing.getDrawTime());
            this.data.drawingDate = selectedDrawing.getDrawDate();
            this.data.winningNumber = {
                digit1: selectedDrawing.getWinningNumberDigit1(),
                digit2: selectedDrawing.getWinningNumberDigit2(),
                digit3: selectedDrawing.getWinningNumberDigit3()
            };
        });
    }

    ngOnDestroy() {
        this.data = null;
        this.pick3StateLottery = null;
        this.selectedDrawingSubscription.unsubscribe();
        this.selectedDrawingSubscription = null;
    }

    public setDrawingTimeMenuItems(targetCurrentDate: Date = new Date()): void {
        if (BytePushers.DateUtility.isSameDate(targetCurrentDate, new Date())) {
            if (Array.isArray(this.drawingTimes)) {
                const drawingTime = Pick3DrawTimeEnum.toString(this?.pick3StateLottery?.getCurrentDrawingTime()?.getType());
                const availableDrawingTimes = this.pick3StateLottery.getAvailableDrawingTimes(drawingTime);
                this.drawingTimes = [];

                availableDrawingTimes.forEach(availableDrawingTime => {
                    this.drawingTimes.push(Pick3DrawTimeEnum.getPropertyKey(availableDrawingTime.getType()));
                });
            }
        } else {
            this.drawingTimes.splice(0, this.drawingTimes.length, ...this.defaultDrawingTimes);
        }
    }

    public getCurrentDrawTime(): Pick3DrawTime {
        return this.pick3StateLottery.getCurrentDrawingTime();
    }

    public selectDrawingDateMenuItemForYesterday(yesterday: any, today: any): void {
        yesterday.style.backgroundColor = '#2fdf75';
        today.style.backgroundColor = '#e5e5e5';
    }

    public selectPreviousDrawingDateMenuItemForToday(today: any, yesterday: any): void {
        today.style.backgroundColor = '#2fdf75';
        yesterday.style.backgroundColor = '#e5e5e5';
    }

    public selectDrawingDateMenuItemForToday(tomorrow: any, today: any) {
        today.style.backgroundColor = '#2fdf75';
        tomorrow.style.backgroundColor = '#e5e5e5';
    }
    public selectDrawingDateMenuItemForTodayGenerate(tomorrow: any, today: any) {
        tomorrow.style.backgroundColor = '#2fdf75';
        today.style.backgroundColor = '#e5e5e5';
    }

    public selectDrawingDateMenuItemForTomorrow(tomorrow: any, today: any) {
        tomorrow.style.backgroundColor = '#2fdf75';
        today.style.backgroundColor = '#e5e5e5';
    }

    public selectTomorrowDrawingDate(tomorrow: any, today: any): void {
        const date = new Date();
        this.selectDrawingDateMenuItemForTomorrow(tomorrow, today);
        const tomorrowFullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0);
        console.log(tomorrowFullDate);
        this.setDrawingTimeMenuItems(tomorrowFullDate);
        this.selectDrawingDateMenuItemForTomorrow(tomorrow, today);
    }

    public selectTodayDrawingDate(tomorrow: any, today: any): void {
        const date = new Date();

        const todayFullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        today.style.backgroundColor = '#2fdf75';
        tomorrow.style.backgroundColor = '#e5e5e5';
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
