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
import {Router} from '@angular/router';
import {LanguagePopoverComponent} from '../language-popover/language-popover.component';
import {PopoverController} from '@ionic/angular';
import {AppService} from '../../app.service';
import {DrawDateService} from '../../services/draw-date.service';
import {Subscription} from 'rxjs';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pick3-draw-date-info-section',
    templateUrl: './pick3-draw-date-info-section.html',
    styleUrls: ['pick3-draw-date-info-section.scss']
})
// tslint:disable-next-line:component-class-suffix
export class Pick3DrawDateInfoSection implements OnInit, OnDestroy {
    private static counter = 0;
    private readonly id: number;
    private readonly defaultDrawTimeCard: Pick3DrawTimeCard;
    public data: Pick3DrawDateCard = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    public defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    public showCountDownToDrawing = false;
    public drawTimeCard: Pick3DrawTimeCard;
    public generateNavigation: any;
    public viewNavigation: any;
    private drawDateSubscription: Subscription;
    private cardContextSubscription: Subscription;

    constructor(private cardContextService: CardContextService,
                public drawStateService: DrawStateService,
                private toastService: IonicToastNotificationService,
                private router: Router,
                public translate: I18nService,
                public translateService: TranslateService,
                private drawDateService: DrawDateService,
                private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private appService: AppService,
                private popoverController: PopoverController) {

        this.id = ++Pick3DrawDateInfoSection.counter;
        this.defaultDrawTimeCard = this.appService.getPick3DrawTimeCards(this.id)[0];
        console.log('Pick3DrawDateInfoSection() constructor. id: ' + this.id);
    }

    ngOnDestroy(): void {
        this.data = null;
        this.defaultDrawDateTime = null;
        this.showCountDownToDrawing = false;
        this.appService = null;
        this.drawDateSubscription?.unsubscribe();
        this.cardContextSubscription?.unsubscribe();
    }


    ngOnInit(): void {
        const someDateTime = new Date();
        const pick3DrawTime: Pick3DrawTime = this.appService.getDrawTime(someDateTime);
        const pick3DrawDateCard = this.appService.getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime(pick3DrawTime);

        this.setData(
            this.appService.getDrawState(),
            pick3DrawDateCard,
            this.appService.getBackgroundImageUrl(),
            this.getCurrentDrawTimeIcon(pick3DrawTime)
        );

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
       this.cardContextSubscription =  this.cardContextService.context$.subscribe(context => {
            if (context && context.slideNumber === this.id) {
                console.log('Pick3DrawDateInfoSection.cardContextService.context$.subscribe() method: context: ', context);
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
        const pick3DrawTimeCard: Pick3DrawTimeCard = this.appService.getPick3DrawTimeCards(this.id).find(drawTime => {
            // TODO We need to convert what is coming from scraper to the real enum
            // TODO Then we want to use drawTime.toString DAY Day
            const drawTimeValue = Pick3DrawTimeEnum.toString(drawTime.getDrawTimeValue());

            if (drawTimeValue === Pick3DrawTimeEnum.toString(pick3DrawTime.getType())) {
                return true;
            }
        });
        return (pick3DrawTimeCard === null || pick3DrawTimeCard === undefined) ? null : pick3DrawTimeCard.getIcon();
    }

    private setDrawState(pick3DrawDateCard: Pick3DrawDateCard, pick3DrawTimeCardStateEnum: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum) {
        this.appService.getPick3DrawTimeCards(this.id).forEach((drawTime, drawTimeIndex, drawTimeArray) => {
            if (drawTime.getDrawTime() === pick3DrawDateCard.getDrawTime()) {
                drawTime.setSelected(true);
                drawTime.setState(pick3DrawTimeCardStateEnum);
            } else {
                drawTime.setSelected(false);
            }
        });
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

        const selectedPick3DrawTime = this.appService.getPick3DrawTimeCards(this.id).find(drawTime => {
            if (drawTime.getDrawTime() === p3dtt) {
                return drawTime;
            }
        });

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
}
