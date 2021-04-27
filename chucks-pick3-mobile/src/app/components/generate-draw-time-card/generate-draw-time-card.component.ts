import {Component, Input, ElementRef, OnDestroy, OnInit, ViewChild, NgModule} from '@angular/core';
import {Pick3DrawDateCard} from '../../models/pick3-draw-date-card';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3DrawTimeCardDomain} from '../../models/pick3-draw-time-card.domain';
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

@Component({
    selector: 'app-generate-draw-time-card',
    templateUrl: './generate-draw-time-card.component.html',
    styleUrls: ['./generate-draw-time-card.component.scss'],
})
export class GenerateDrawTimeCardComponent implements OnInit, OnDestroy {

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                public toastService: IonicToastNotificationService,
                public translate: I18nService,
                public translateService: TranslateService) {
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
    }

    public currentDate = new Date();
    defaultDrawingTimes = [MORNING_DRAW_TIME_KEY, DAY_DRAW_TIME_KEY, EVENING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY];
    @Input() slideNumber: number;
    @Input() data: Pick3DrawDateCard;
    @Input() defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;

    public showCountDownToDrawing = false;

    newDrawingTimes = [];
    drawingTimeMenuItem = [];
    drawTimes: Array<Pick3DrawTimeCard> = [
        new Pick3DrawTimeCardDomain({
            title: MORNING_DRAW_TIME_KEY,
            drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING,
            icon: 'morning-icon',
            dateTime: new Date().setHours(10, 15, 0, 0)
        }),
        new Pick3DrawTimeCardDomain({
            title: DAY_DRAW_TIME_KEY,
            drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY,
            icon: 'day-icon',
            dateTime: new Date().setHours(11, 45, 0, 0)
        }),
        new Pick3DrawTimeCardDomain({
            title: EVENING_DRAW_TIME_KEY,
            drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.EVENING,
            icon: 'evening-icon',
            dateTime: new Date().setHours(17, 15, 0, 0)
        }),
        new Pick3DrawTimeCardDomain({
            title: NIGHT_DRAW_TIME_KEY,
            drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.NIGHT,
            icon: 'night-icon',
            dateTime: new Date().setHours(21, 30, 0, 0)
        })
    ];

    private pick3StateLottery: Pick3StateLottery;
    generateChoice: any;
    continueChoice: any;
    continueButton = true;

    ngOnInit() {
        const someDateTime = new Date();
        document.getElementById('generate').style.display = 'none';
        const pick3DrawTime: Pick3DrawTime = this.getDrawTime(someDateTime);
        this.randomlyMockDrawTimeCardStates();
        registerLocaleData(localeEsMx, 'es-MX');
        registerLocaleData(localeEnUS, 'en-US');

        this.setData(this.getDrawState(), pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl(),
            this.getCurrentDrawTimeIcon(pick3DrawTime));

    }

    ngOnDestroy() {
        this.slideNumber = -1;
        this.data = null;
        this.defaultDrawDateTime = null;
        this.showCountDownToDrawing = false;
        this.drawTimes = [];
        this.pick3StateLottery = null;
    }

    public setDrawingTimeMenuItems(targetCurrentDate: Date): void {

        if (BytePushers.DateUtility.isSameDate(targetCurrentDate, new Date())) {
            this.resetDrawingTimes();
            for (const i of this.drawTimes) {
                this.setTodayDrawingTimes(i);
            }
            this.newDrawingTimes.splice(0, this.newDrawingTimes.length, ...this.drawingTimeMenuItem);
        } else {
            this.newDrawingTimes.splice(0, this.newDrawingTimes.length, ...this.defaultDrawingTimes);
        }
    }


    private setTodayDrawingTimes(timenotAvailable) {
        const currentDrawTime = this.pick3StateLottery.getCurrentDrawingTime().getDateTime().getHours();
        if (timenotAvailable.getDateTime().getHours() > currentDrawTime) {
            this.drawingTimeMenuItem.push(timenotAvailable.getTitle());
        }


    }

    private getCurrentDrawTimeIcon(pick3DrawTime: Pick3DrawTime): string {
        const pick3DrawTimeCard: Pick3DrawTimeCard = this.drawTimes.find(drawTime => {
            if (drawTime.getDrawTimeValue() === pick3DrawTime.getType()) {
                return true;
            }
        });

        return (pick3DrawTimeCard === null || pick3DrawTimeCard === undefined) ? null : pick3DrawTimeCard.getIcon();
    }

    public getCurrentDrawTime(): Pick3DrawTime {
        return this.pick3StateLottery.getCurrentDrawingTime();
    }

    private getDrawTime(someDateTime: Date): Pick3DrawTime {
        return this.pick3StateLottery.getDrawingTime(someDateTime);
    }

    private getDrawState(): string {
        return this.pick3StateLottery.getState();
    }


    /**
     * Helper method to set all the data for the Pick3 Draw Date Card.
     *
     * @param stateName
     * @param pick3DrawTime
     * @param backgroundImageUrl
     * @param drawDateIcon
     * @private
     */
    private setData(stateName: string, pick3DrawTime: Pick3DrawTime, backgroundImageUrl: string, drawDateIcon: string): void {
        this.data.setBackgroundImage(backgroundImageUrl);
        this.data.setDrawState(stateName);
        this.data.setDrawTime(pick3DrawTime.getType());
        this.data.setDrawDate(pick3DrawTime.getDateTime());
        this.data.setDrawDateIcon(drawDateIcon);

        if (this.pick3StateLottery.winningNumberHasBeenDrawn(pick3DrawTime)) {
            if (BytePushers.DateUtility.isSameDate(pick3DrawTime.getDateTime(), new Date())) {
                this.getCurrentWinningDrawingNumber(this.data.getDrawState(), pick3DrawTime.getDateTime(), pick3DrawTime.getType());
            } else {
                this.getPastWinningDrawingNumber(this.data.getDrawState(), pick3DrawTime.getDateTime(), pick3DrawTime.getType());
            }
        } else {
            if (BytePushers.DateUtility.isSameDate(pick3DrawTime.getDateTime(), new Date())) {
                this.getCurrentWinningDrawingNumber(this.data.getDrawState(), pick3DrawTime.getDateTime(), pick3DrawTime.getType());
            } else {
                this.getPastWinningDrawingNumber(this.data.getDrawState(), pick3DrawTime.getDateTime(), pick3DrawTime.getType());
            }
            this.showCountDownToDrawing = true;
        }
    }

    private setDrawState(pick3DrawDateCard: Pick3DrawDateCard,
                         pick3DrawTimeCardStateEnum: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum) {
        this.drawTimes.forEach((drawTime, drawTimeIndex, drawTimeArray) => {
            if (drawTime.getDrawTime() === pick3DrawDateCard.getDrawTime()) {
                drawTime.setSelected(true);
                drawTime.setState(pick3DrawTimeCardStateEnum);
            } else {
                drawTime.setSelected(false);
            }

        });
    }

    public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
        const pick3DrawTime: Pick3DrawTime =
            this.pick3StateLottery.getDrawingTimeByName(Pick3DrawTimeEnum.toString(pick3DrawTimeCard.getDrawTime()).toUpperCase());
        this.data.setDrawDateIcon(pick3DrawTimeCard.getIcon());
        this.drawTimes.forEach(drawTime => {
            if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(false);
            } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(true);
            }
        });

        this.setData(this.getDrawState(), pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl(), pick3DrawTimeCard.getIcon());
    }

    private getPastWinningDrawingNumber(drawState: string, pick3DrawDateTime: Date,
                                        pick3DrawTimeType: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        this.pick3WebScrappingService.getPastWinningDrawingNumber(drawState, pick3DrawDateTime, pick3DrawTimeType)
            .then((winningNumber: any) => {
                this.setCardState(winningNumber, pick3DrawTimeType);
            }, error => {
                // TODO: Handle error.
                console.error('TODO: Handle error: ' + error, error);
                this.toastService.presentToast('Internal Error',
                    'Please try again later.', 'internet-not-available');

            });
    }

    private getCurrentWinningDrawingNumber(drawState: string, pick3DrawDateTime: Date,
                                           pick3DrawTimeType: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        this.pick3WebScrappingService.getCurrentWinningDrawingNumber(drawState, pick3DrawDateTime, pick3DrawTimeType)
            .then((winningNumber: any) => {
                this.setCardState(winningNumber, pick3DrawTimeType);
            }, error => {
                // TODO: Handle error.
                console.error('TODO: Handle error: ' + error, error);
                this.toastService.presentToast('Results Not Available',
                    'Please try again later.', 'results-not-available');
            });
    }

    private resetDrawingTimes(): void {
        if (this.newDrawingTimes !== null && this.newDrawingTimes !== undefined) {
            this.newDrawingTimes.length = 0;
            this.drawingTimeMenuItem.length = 0;
        }

    }

    private setCardState(winningNumber: any, pick3DrawTimeType: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        const drawingResult = {
            drawDate: winningNumber.date,
            drawTime: winningNumber.time,
            drawResult: winningNumber.number,
        };
        let p3dtt: any;

        if (typeof pick3DrawTimeType === 'string') {
            const p: any = pick3DrawTimeType;
            p3dtt = Pick3DrawTimeEnum.Pick3DrawTimeEnum[p.toUpperCase()];
        } else {
            p3dtt = pick3DrawTimeType;
        }

        const selectedPick3DrawTime = this.drawTimes.find(drawTime => {
            if (drawTime.getDrawTime() === p3dtt) {
                return drawTime;
            }
        });
        this.data.setWinningNumber(drawingResult.drawResult);
        switch (selectedPick3DrawTime.getState()) {
            case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS:
                this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS);
                break;
            case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS:
                this.setDrawState(this.data,
                    Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS);
                break;
            case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN:
                this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN);
                break;
            case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS:
                this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS);
                break;
            default:
                this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET);
        }
        this.showCountDownToDrawing = false;
    }

    private randomlyMockDrawTimeCardStates(): void {
        this.drawTimes.forEach(drawTime => {
            drawTime.setState(this.randomEnum(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum));
            drawTime.setPick3DrawCardId(this.slideNumber);

            if (drawTime.getDrawTime() === Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY) {
            }
        });

    }

    private randomEnum<T>(anEnum: T): T[keyof T] {
        const item = Math.floor(Math.random() * Object.keys(anEnum).length);
        const i2 = Object.keys(anEnum)[item];
        return anEnum[i2];
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
