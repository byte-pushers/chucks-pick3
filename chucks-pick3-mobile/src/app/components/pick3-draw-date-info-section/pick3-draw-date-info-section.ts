import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3DrawDateCardDomain} from '../../models/pick3-draw-date-card.domain';
import {DrawStateService} from '../../services/draw-state.service';
import {TranslateService} from '@ngx-translate/core';
import {I18nService} from '../../services/i18n.service';
import {Pick3DrawTime} from '../../models/pick3-draw-time';
import {Pick3DrawDateCard} from '../../models/pick3-draw-date-card';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {IonicToastNotificationService} from '../../services/ionic-toast-notification.service';
import {registerLocaleData} from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import * as BytePushers from 'bytepushers-js-core';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {LanguagePopoverComponent} from '../language-popover/language-popover.component';
import {PopoverController} from '@ionic/angular';
import {AppService} from '../../app.service';
import {DrawDateService} from '../../services/draw-date.service';
import {Subscription} from 'rxjs';
import {SlideTransitionService} from '../../services/slide-transition.service';
import {Pick3DrawTimeCardProperties} from '../../models/pick3-draw-time-card.properties';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pick3-draw-date-info-section',
    templateUrl: './pick3-draw-date-info-section.html',
    styleUrls: ['pick3-draw-date-info-section.scss']
})
// tslint:disable-next-line:component-class-suffix
export class Pick3DrawDateInfoSection implements OnInit, OnDestroy {
    private static counter = 0;
    public readonly id: number;
    private readonly defaultDrawTimeCard: Pick3DrawTimeCard;
    public data: Pick3DrawDateCard = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    public defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    public showCountDownToDrawing = false;
    public drawTimeCard: Pick3DrawTimeCard;
    public selectedDrawTimeCard: Pick3DrawTimeCardProperties;
    public generateNavigation: any;
    public viewNavigation: any;
    private drawDateSubscription: Subscription;
    private cardContextSubscription: Subscription;
    public currentSlideNumber: number;
    private routerUrl = this.router.url;

    constructor(private cardContextService: CardContextService,
                public drawStateService: DrawStateService,
                private toastService: IonicToastNotificationService,
                private router: Router,
                private route: ActivatedRoute,
                public translate: I18nService,
                public translateService: TranslateService,
                private drawDateService: DrawDateService,
                private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private appService: AppService,
                private popoverController: PopoverController,
                private slideTransitionService: SlideTransitionService) {
        const routerState = this.router.getCurrentNavigation().extras.state;
        console.log(routerState);

        if (this.routerUrl === '/home') {
            this.id = ++Pick3DrawDateInfoSection.counter;
            console.log('Pick3DrawDateInfoSection() constructor. id: ' + this.id);
            try {
                this.defaultDrawTimeCard = this.appService.getPick3DrawTimeCards(this.id)[0];
            } catch (error) {
                if (this.id >= 1 && this.id <= 7) {
                    throw error;
                }
            }
            console.log('current slide number: ' + routerState?.currentSlideNumber);

        } else if (this.routerUrl === '/select-picks') {
            this.id = routerState?.currentSlideNumber;
            console.log('Pick3DrawDateInfoSection() constructor. id: ' + this.id);
            const pick3DrawTime = this.retrievePick3DrawTime(routerState?.currentSlideNumber);
            this.setData(
                this.appService.getDrawState(),
                pick3DrawTime,
                this.appService.getBackgroundImageUrl(),
                pick3DrawTime.getIcon());

            this.currentSlideNumber = routerState?.currentSlideNumber;

        }
    }


    ngOnInit(): void {
        const someDateTime = new Date();
        const pick3DrawTime: Pick3DrawTime = this.appService.getDrawTime(someDateTime);
        const pick3DrawDateCard = this.appService.getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime(pick3DrawTime);
        const routerState = this.router.getCurrentNavigation().extras.state;
        console.log(routerState);
        if (this.routerUrl === '/home') {
            this.setData(
                this.appService.getDrawState(),
                pick3DrawDateCard,
                this.appService.getBackgroundImageUrl(),
                this.getCurrentDrawTimeIcon(pick3DrawTime)
            );
        } else if (this.routerUrl === '/select-picks') {
            console.log('Pick3DrawDateInfoSection() constructor. id: ' + this.id);
            const pick3DrawTimeSet = this.retrievePick3DrawTime(routerState?.currentSlideNumber);
            this.setData(
                this.appService.getDrawState(),
                pick3DrawTimeSet,
                this.appService.getBackgroundImageUrl(),
                pick3DrawTimeSet.getIcon());

            this.currentSlideNumber = routerState?.currentSlideNumber;
        }
        registerLocaleData(localeEsMx, 'es-MX');
        registerLocaleData(localeEnUS, 'en-US');

        this.drawDateSubscription = this.drawDateService.getPick3DrawDateCard$().subscribe((currentPick3DrawDateCard: Pick3DrawTimeCard) => {
            const currentPick3DrawDateCardId = currentPick3DrawDateCard.getPick3DrawCardId();

            if (currentPick3DrawDateCardId && currentPick3DrawDateCardId === this.id) {
                this.setData(
                    this.appService.getDrawState(),
                    currentPick3DrawDateCard,
                    this.appService.getBackgroundImageUrl(),
                    currentPick3DrawDateCard.getIcon()
                );
                this.drawTimeCard = currentPick3DrawDateCard;
                this.showCountDownToDrawing = currentPick3DrawDateCard.showCountDownToDrawing;
            }
        });

        this.generateNavigation = this.drawStateService.generateNavigationChoice;
        this.viewNavigation = this.drawStateService.viewNavigationChoice;
        this.cardContextSubscription = this.cardContextService.context$.subscribe(context => {
            if (context && context.slideNumber === this.id) {
                this.slideTransitionService.dispatchCurrentSlideNumberEvent(context.slideNumber);
                console.log('Pick3DrawDateInfoSection.cardContextService.context$.subscribe() method: context: ', context);
                this.slideTransitionService.dispatchCurrentSlideNumberEvent(context.slideNumber);
                const pick3DrawDateCard = this.appService.getPick3DrawDateCard(context.slideNumber);
                const currentPick3DrawTimeCard = (this.drawTimeCard) ? this.drawTimeCard : this.defaultDrawTimeCard;
                this.defaultDrawDateTime = context.defaultDrawDateTime;
                this.setData(
                    pick3DrawDateCard.getDrawState(),
                    currentPick3DrawTimeCard,
                    this.appService.getBackgroundImageUrl(),
                    currentPick3DrawTimeCard.getIcon()
                );

            }
        });
    }

    ngOnDestroy(): void {
        console.log(this.slideTransitionService.currentSlideNumber);
        console.log(`Pick3DrawDateInfoSection.ngOnDestroy: id: ${this.id}`);
        this.data = null;
        this.defaultDrawDateTime = null;
        this.showCountDownToDrawing = false;
        this.appService = null;
        this.drawDateSubscription?.unsubscribe();
        this.cardContextSubscription?.unsubscribe();
        Pick3DrawDateInfoSection.counter--;
    }

    async showPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: LanguagePopoverComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true
        });
        popover.style.cssText = '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
        return await popover.present();
    }

    private setData(drawState: string, pick3DrawTimeCard: Pick3DrawTimeCard, backgroundImageUrl: string, drawTimeIcon: string): void {
        const pick3DrawTime = pick3DrawTimeCard.getPick3DrawTime();

        this.data.setBackgroundImage(backgroundImageUrl);
        this.data.setDrawState(drawState);
        this.data.setDrawTime(pick3DrawTime.getType());
        this.data.setDrawDate(new Date(pick3DrawTime.getDateTime()));
        this.data.setIcon(drawTimeIcon);

        if (this.appService.winningNumberHasBeenDrawn(pick3DrawTime)/* && this.appService.getNextDrawingTime(pick3DrawTime)*/) {
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

            pick3DrawTimeCard.showCountDownToDrawing = true;
        }
    }

    private getCurrentDrawTimeIcon(pick3DrawTime: Pick3DrawTime): string {
        let pick3DrawTimeCard: Pick3DrawTimeCard;

        try {
            pick3DrawTimeCard = this.appService.getPick3DrawTimeCards(this.id).find(drawTime => {
                // TODO We need to convert what is coming from scraper to the real enum
                // TODO Then we want to use drawTime.toString DAY Day
                const drawTimeValue = Pick3DrawTimeEnum.toString(drawTime.getDrawTimeValue());

                if (drawTimeValue === Pick3DrawTimeEnum.toString(pick3DrawTime.getType())) {
                    return true;
                }
            });
        } catch (error) {
            if (this.id >= 1 && this.id <= 7) {
                throw error;
            }
        }
        return (pick3DrawTimeCard === null || pick3DrawTimeCard === undefined) ? null : pick3DrawTimeCard.getIcon();
    }

    private setDrawState(pick3DrawDateCard: Pick3DrawDateCard, pick3DrawTimeCardStateEnum: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum) {
        try {
            this.appService.getPick3DrawTimeCards(this.id).forEach((drawTime, drawTimeIndex, drawTimeArray) => {
                if (drawTime.getDrawTime() === pick3DrawDateCard.getDrawTime()) {
                    drawTime.setSelected(true);
                    drawTime.setState(pick3DrawTimeCardStateEnum);
                } else {
                    drawTime.setSelected(false);
                }
            });
        } catch (error) {
            if (this.id >= 1 && this.id <= 7) {
                throw error;
            }
        }
    }

    private getPastWinningDrawingNumber(drawState: string, pick3DrawDateTime: Date, pick3DrawTimeType: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        this.pick3WebScrappingService.getPastWinningDrawingNumber(drawState, pick3DrawDateTime, pick3DrawTimeType).then((winningNumber: any) => {
            this.setCardState(winningNumber, pick3DrawTimeType);
        }, error => {
            // TODO: Handle error.
            console.error('TODO: Handle error: ' + error, error);
            this.toastService.presentToast('Internal Error',
                'Please try again later.', 'internet-not-available');
            this.setCardState(null, pick3DrawTimeType);
        });
    }

    private getCurrentWinningDrawingNumber(drawState: string, pick3DrawDateTime: Date,
                                           pick3DrawTimeType: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        this.pick3WebScrappingService.getCurrentWinningDrawingNumber(drawState, pick3DrawDateTime, pick3DrawTimeType).then((winningNumber: any) => {
            this.setCardState(winningNumber, pick3DrawTimeType);
        }, error => {
            // TODO: Handle error.
            console.warn('TODO: Handle error: ' + error, error);
            this.toastService.presentToast('Results Not Available',
                'Please try again later.', 'results-not-available');
            this.setCardState(null, pick3DrawTimeType);
        });
    }

    private setCardState(winningNumber: any, pick3DrawTimeType: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        const drawingResult = {
            drawDate: winningNumber?.date,
            drawTime: winningNumber?.time,
            drawResult: winningNumber?.number,
        };
        let p3dtt: any;

        if (typeof pick3DrawTimeType === 'string') {
            const p: any = pick3DrawTimeType;
            p3dtt = Pick3DrawTimeEnum.Pick3DrawTimeEnum[p.toUpperCase()];
        } else {
            p3dtt = pick3DrawTimeType;
        }

        let selectedPick3DrawTime;

        try {
            selectedPick3DrawTime = this.appService.getPick3DrawTimeCards(this.id).find(drawTime => {
                if (drawTime.getDrawTime() === p3dtt) {
                    return drawTime;
                }
            });
        } catch (error) {
            if (this.id >= 1 && this.id <= 7) {
                throw error;
            }
        }

        this.data.setWinningNumber(drawingResult?.drawResult);

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
    }

    showBackButton(subSection: any) {
        this.drawStateService.generateNavigationChoice = subSection;
        this.drawStateService.viewNavigationChoice = subSection;
    }

    public passData() {
        const currentSlideNumber = this.router.getCurrentNavigation().extras.state.currentSlideNumber;
        const pick3DrawTime = this.retrievePick3DrawTime(currentSlideNumber);
        this.slideTransitionService.setTransitionalPick3DrawTimeCard(pick3DrawTime);
        this.selectedDrawTimeCard = this.retrievePick3DrawTimeAsJSON(currentSlideNumber);
    }

    private retrievePick3DrawTime(currentSlideNumber): Pick3DrawTimeCard {
        const date = this.appService.getSlideDate(currentSlideNumber);
        const drawTime = this.appService.getDrawTime(date);
        const pick3DrawTime = this.appService.getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime(drawTime);

        return pick3DrawTime;
    }

    private retrievePick3DrawTimeAsJSON(currentSlideNumber): any {
        return JSON.parse(JSON.stringify(this.retrievePick3DrawTime(currentSlideNumber)));
    }
}
