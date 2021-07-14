import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3DrawDateCardDomain} from '../../models/pick3-draw-date-card.domain';
import {DrawStateService} from '../../services/draw-state.service';
import {TranslateService} from '@ngx-translate/core';
import {I18nService} from '../../services/i18n.service';
import {Pick3DrawTime} from '../../models/pick3-draw-time';
import {Pick3DrawDateCard} from '../../models/pick3-draw-date-card';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {IonicToastNotificationService} from '../../services/ionic-toast-notification.service';
import {registerLocaleData} from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import * as BytePushers from 'bytepushers-js-core';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import {DrawTimeService} from '../../services/draw-time.service';
import {Route, Router} from '@angular/router';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pick3-draw-date-info-section',
    templateUrl: './pick3-draw-date-info-section.html',
    styleUrls: ['pick3-draw-date-info-section.scss']
})
// tslint:disable-next-line:component-class-suffix
export class Pick3DrawDateInfoSection implements OnInit {

    constructor(private cardContextService: CardContextService,
                public drawStateService: DrawStateService,
                private toastService: IonicToastNotificationService,
                private router: Router,
                public translate: I18nService,
                public translateService: TranslateService,
                public drawTimeService: DrawTimeService,
                private pick3WebScrappingService: Pick3WebScrapingProviderService) {

        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
    }

    public slideNumber: number;
    public data: Pick3DrawDateCard = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    public defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    public showCountDownToDrawing = false;
    private drawTimes: Array<Pick3DrawTimeCard> = [];
    public pick3StateLottery: Pick3StateLottery;
    public item: Pick3DrawTimeCard;
    public generateNavigation: any;
    public viewNavigation: any;


    /*ngOnDestroy(): void {
        this.slideNumber = -1;
        this.data = null;
        this.defaultDrawDateTime = null;
        this.showCountDownToDrawing = false;
        this.pick3StateLottery = null;
    }*/


    ngOnInit(): void {
        const someDateTime = new Date();
        const pick3DrawTime: Pick3DrawTime = this.getDrawTime(someDateTime);
        this.setData(
            this.getDrawState(),
            pick3DrawTime,
            this.pick3StateLottery.getBackgroundImageUrl(),
            this.getCurrentDrawTimeIcon(pick3DrawTime)
        );
        registerLocaleData(localeEsMx, 'es-MX');
        registerLocaleData(localeEnUS, 'en-US');

        this.drawTimeService.getPick3DrawTime$().subscribe((currentPick3DrawTimeCard: Pick3DrawTimeCard) => {
                this.setData(
                    this.getDrawState(),
                    currentPick3DrawTimeCard.getPick3DrawTime(),
                    this.pick3StateLottery.getBackgroundImageUrl(),
                    currentPick3DrawTimeCard.getIcon());
                this.item = currentPick3DrawTimeCard;
            }
        );
        this.generateNavigation = this.drawStateService.generateNavigationChoice;
        this.viewNavigation = this.drawStateService.viewNavigationChoice;
        this.cardContextService.context$.subscribe(context => {
            this.slideNumber = context.slideNumber;
            this.defaultDrawDateTime = context.defaultDrawDateTime;
            this.drawTimes.splice(0, this.drawTimes.splice.length, ...context.drawTimes);
        });
    }

    private setData(drawState: string, pick3DrawTime: Pick3DrawTime, backgroundImageUrl: string, drawTimeIcon: string): void {
        this.data.setBackgroundImage(backgroundImageUrl);
        this.data.setDrawState(drawState);
        this.data.setDrawTime(pick3DrawTime.getType());
        this.data.setDrawDate(pick3DrawTime.getDateTime());
        this.data.setIcon(drawTimeIcon);

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

    private getCurrentDrawTimeIcon(pick3DrawTime: Pick3DrawTime): string {
        const pick3DrawTimeCard: Pick3DrawTimeCard = this.drawTimes.find(drawTime => {
            // TODO We need to convert what is coming from scraper to the real enum
            // TODO Then we want to use drawTime.toString DAY Day
            const drawTimeValue = Pick3DrawTimeEnum.toString(drawTime.getDrawTimeValue());

            if (drawTimeValue === Pick3DrawTimeEnum.toString(pick3DrawTime.getType())) {
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

    private setDrawState(pick3DrawDateCard: Pick3DrawDateCard, pick3DrawTimeCardStateEnum: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum) {
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
        const pick3DrawTime: Pick3DrawTime = this.pick3StateLottery.getDrawingTimeByName(Pick3DrawTimeEnum.toString(pick3DrawTimeCard.getDrawTime()).toUpperCase());
        this.data.setIcon(pick3DrawTimeCard.getIcon());
        this.drawTimes.forEach(drawTime => {
            if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(false);
            } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(true);
            }
        });

        this.setData(this.getDrawState(), pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl(), pick3DrawTimeCard.getIcon());
    }

    private getPastWinningDrawingNumber(drawState: string, pick3DrawDateTime: Date, pick3DrawTimeType: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        this.pick3WebScrappingService.getPastWinningDrawingNumber(drawState, pick3DrawDateTime, pick3DrawTimeType).then((winningNumber: any) => {
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
        this.pick3WebScrappingService.getCurrentWinningDrawingNumber(drawState, pick3DrawDateTime, pick3DrawTimeType).then((winningNumber: any) => {
            this.setCardState(winningNumber, pick3DrawTimeType);
        }, error => {
            // TODO: Handle error.
            /*  console.error('TODO: Handle error: ' + error, error);*/
            this.toastService.presentToast('Results Not Available',
                'Please try again later.', 'results-not-available');
        });
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

        if (selectedPick3DrawTime) {
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
        }

        this.showCountDownToDrawing = false;
    }

    showBackButton(subSection: any) {
        this.drawStateService.generateNavigationChoice = subSection;
        this.drawStateService.viewNavigationChoice = subSection;

    }
}