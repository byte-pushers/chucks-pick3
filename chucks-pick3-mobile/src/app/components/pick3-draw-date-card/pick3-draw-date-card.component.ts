import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Pick3DrawDateCard} from '../../models/pick3-draw-date-card';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3DrawTimeCardDomain} from '../../models/pick3-draw-time-card.domain';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3DrawTime} from '../../models/pick3-draw-time';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import * as BytePushers from 'bytepushers-js-core';
import {IonicToastNotificationService} from '../../services/ionic-toast-notification.service';
import {DrawStateService} from '../../services/draw-state.service';
import {title} from 'ionic/lib/color';
import {EnumValue} from '@angular/compiler-cli/src/ngtsc/partial_evaluator';
import {type} from 'os';

@Component({
    selector: 'pick3-draw-date-card',
    templateUrl: './pick3-draw-date-card.component.html',
    styleUrls: ['./pick3-draw-date-card.component.scss'],
})
export class Pick3DrawDateCardComponent implements OnInit, OnDestroy {
    @Input() slideNumber: number;
    @Input() data: Pick3DrawDateCard;
    @Input() defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;

    public showCountDownToDrawing: boolean = false;

    drawTimes: Array<Pick3DrawTimeCard> = [
        new Pick3DrawTimeCardDomain({
            title: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING,
            drawTime: 'Morning',
            icon: 'morning-icon',
            dateTime: new Date().setHours(10, 15, 0, 0)
        }),
        new Pick3DrawTimeCardDomain({
            title: Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY,
            drawTime: 'Day',
            icon: 'day-icon',
            dateTime: new Date().setHours(11, 45, 0, 0)
        }),
        new Pick3DrawTimeCardDomain({
            title: Pick3DrawTimeEnum.Pick3DrawTimeEnum.EVENING,
            drawTime: 'Evening',
            icon: 'evening-icon',
            dateTime: new Date().setHours(17, 15, 0, 0)
        }),
        new Pick3DrawTimeCardDomain({
            title: Pick3DrawTimeEnum.Pick3DrawTimeEnum.NIGHT,
            drawTime: 'Night',
            icon: 'night-icon',
            dateTime: new Date().setHours(21, 30, 0, 0)
        })
    ];

    private pick3StateLottery: Pick3StateLottery;

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                public toastService: IonicToastNotificationService,
                public drawStateService: DrawStateService) {
        this.isEnumOrString('test');
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
    }

    ngOnInit() {
        //console.log("OnInit - slide#: " + this.slideNumber);
        const someDateTime = new Date();
        //someDateTime.setDate(someDateTime.getDate() - 1);
        //someDateTime.setHours(17, 30, 0, 0);
        let pick3DrawTime: Pick3DrawTime = this.getDrawTime(someDateTime);
        this.randomlyMockDrawTimeCardStates();
        //this.setDrawTimeCardsState();
        //console.log("setData() start.");
        this.setData(this.getDrawState(), pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl(), this.getCurrentDrawTimeIcon(pick3DrawTime));
        //console.log("setData() end.");
    }

    ngOnDestroy() {
        this.slideNumber = -1;
        this.data = null;
        this.defaultDrawDateTime = null;
        this.showCountDownToDrawing = false;
        this.drawTimes = [];
        this.pick3StateLottery = null;
    }

    private getCurrentDrawTimeIcon(pick3DrawTime: Pick3DrawTime): string {
        const pick3DrawTimeCard: Pick3DrawTimeCard = this.drawTimes.find(drawTime => {
            if (drawTime.getTitle().toUpperCase() === pick3DrawTime.getType().toUpperCase()) {
                return true;
            }
        });

        return (pick3DrawTimeCard === null || pick3DrawTimeCard === undefined) ? null : pick3DrawTimeCard.getIcon();
    }

    public getCurrentDrawTime(): Pick3DrawTime {
        return this.pick3StateLottery.getCurrentDrawingTime();
    }

    private formatWording(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
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
        this.data.setDrawTime(Pick3DrawTimeEnum.toEnum(pick3DrawTime.getType()));
        this.data.setDrawDate(pick3DrawTime.getDateTime());
        this.data.setDrawDateIcon(drawDateIcon);

        if (this.pick3StateLottery.winningNumberHasBeenDrawn(pick3DrawTime)/* && this.pick3StateLottery.getNextDrawingTime(pick3DrawTime)*/) {
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

    /*private displayDrawTime(drawDate: Date): void {
      const pick3DrawTime: Pick3DrawTime = this.pick3StateLottery.getDrawingTime(drawDate);
      this.setData(this.getDrawState(), pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl());
    }*/

    private setDrawState(pick3DrawDateCard: Pick3DrawDateCard, pick3DrawTimeCardStateEnum: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum) {
        this.drawTimes.forEach((drawTime, drawTimeIndex, drawTimeArray) => {
            //const compareResult = drawTime.compareTo(pick3DrawDateCard);

            if (drawTime.getTitle().toUpperCase() === pick3DrawDateCard.getDrawTime()) {
                drawTime.setSelected(true);
                drawTime.setState(pick3DrawTimeCardStateEnum);
            } else {
                drawTime.setSelected(false);
            }

            /*if (compareResult === 0) {
              drawTime.setState(pick3DrawTimeCardStateEnum);
            } else if (compareResult === -1) {
              drawTime.setState(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN);
            } else if (compareResult === 1) {
              drawTime.setState(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET);
            }*/
        });
    }

    public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
        console.log('selectDrawingTimeCard() method - Pick3DrawTimeEnum.Pick3DrawTimeEnum[pick3DrawTimeCard.getDrawTime()]' + Pick3DrawTimeEnum.Pick3DrawTimeEnum[pick3DrawTimeCard.getDrawTime()]);
        console.log('selectDrawingTimeCard() method - Pick3DrawTimeEnum.Pick3DrawTimeEnum["MORNING"]' + Pick3DrawTimeEnum.Pick3DrawTimeEnum["MORNING"]);
        console.log('selectDrawingTimeCard() method - Pick3DrawTimeEnum.Pick3DrawTimeEnum[\'draw.time.enum.morning\']' + Pick3DrawTimeEnum.Pick3DrawTimeEnum['draw.time.enum.morning']);
        const pick3DrawTime: Pick3DrawTime = this.pick3StateLottery
            .getDrawingTimeByName(Pick3DrawTimeEnum.Pick3DrawTimeEnum[pick3DrawTimeCard.getDrawTime()]);
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

    private getPastWinningDrawingNumber(drawState: string, pick3DrawDateTime: Date, pick3DrawTimeType: string): void {
        this.pick3WebScrappingService.getPastWinningDrawingNumber(drawState, pick3DrawDateTime, pick3DrawTimeType).then((winningNumber: any) => {
            this.setCardState(winningNumber, pick3DrawTimeType);
        }, error => {
            //TODO: Handle error.
            console.error('TODO: Handle error: ' + error, error);
            this.toastService.presentToast('Internal Error',
                'Please try again later.', 'internet-not-available');

        });
    }

    private getCurrentWinningDrawingNumber(drawState: string, pick3DrawDateTime: Date, pick3DrawTimeType: string): void {
        this.pick3WebScrappingService.getCurrentWinningDrawingNumber(drawState, pick3DrawDateTime, pick3DrawTimeType).then((winningNumber: any) => {
            this.setCardState(winningNumber, pick3DrawTimeType);
        }, error => {
            //TODO: Handle error.
            console.error('TODO: Handle error: ' + error, error);
            this.toastService.presentToast('Results Not Available',
                'Please try again later.', 'results-not-available');
        });
    }

    private setCardState(winningNumber: any, pick3DrawTimeType: string): void {
        const drawingResult = {
            drawDate: winningNumber.date,
            drawTime: winningNumber.time,
            drawResult: winningNumber.number,
        };
        const selectedPick3DrawTime = this.drawTimes.find(drawTime => {
            if (drawTime.getDrawTime() === Pick3DrawTimeEnum.Pick3DrawTimeEnum[pick3DrawTimeType.toUpperCase()]) {
                return drawTime;
            }
        });
        this.data.setWinningNumber(drawingResult.drawResult);
        switch (selectedPick3DrawTime.getState()) {
            case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS:
                this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS);
                break;
            case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS:
                this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS);
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
        // console.log("randomlyMockDrawTimeCardStates() start.");
        this.drawTimes.forEach(drawTime => {
            drawTime.setState(this.randomEnum(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum));
            drawTime.setPick3DrawCardId(this.slideNumber);

            if (drawTime.getDrawTime() === Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY) {
                //drawTime.setState(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS);
            }
        });

        //console.log("randomlyMockDrawTimeCardStates() end.");
    }

    private randomEnum<T>(anEnum: T): T[keyof T] {
        const item = Math.floor(Math.random() * Object.keys(anEnum).length);
        const i2 = Object.keys(anEnum)[item];
        return anEnum[i2];
    }

    private isEnumOrString(value) {
        if (value === '[object Object]' || value instanceof Object) {
console.log('is enum');
        } else if (typeof value === 'string' || value instanceof String) {
console.log('is string');
        }
    }
}
