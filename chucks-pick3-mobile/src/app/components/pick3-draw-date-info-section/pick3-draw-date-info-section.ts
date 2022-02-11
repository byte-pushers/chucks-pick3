import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardContextService } from '../../services/card-context.service';
import { Pick3DrawTimeEnum } from '../../models/pick3-draw-time.enum';
import { Pick3DrawDateCardDomain } from '../../models/pick3-draw-date-card.domain';
import { DrawStateService } from '../../services/draw-state.service';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';
import { Pick3DrawTime } from '../../models/pick3-draw-time';
import { Pick3DrawDateCard } from '../../models/pick3-draw-date-card';
import { Pick3WebScrapingProviderService } from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import { IonicToastNotificationService } from '../../services/ionic-toast-notification.service';
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import * as BytePushers from 'bytepushers-js-core';
import { Pick3DrawTimeCard } from '../../models/pick3-draw-time-card';
import { Pick3DrawTimeCardStateEnum } from '../../models/pick3-draw-time-card-state.enum';
import { NavigationEnum } from '../../models/navigate.enum';
import { Router } from '@angular/router';
import { LanguagePopoverComponent } from '../language-popover/language-popover.component';
import { NavController, PopoverController } from '@ionic/angular';
import { AppService } from '../../app.service';
import { DrawDateService } from '../../services/draw-date.service';
import { Subscription } from 'rxjs';
import { Pick3DrawTimeCardProperties } from '../../models/pick3-draw-time-card.properties';
import { publish } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pick3-draw-date-info-section',
  templateUrl: './pick3-draw-date-info-section.html',
  styleUrls: ['pick3-draw-date-info-section.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class Pick3DrawDateInfoSection implements OnInit, OnDestroy {
  public id = -1;
  public data: Pick3DrawDateCard = new Pick3DrawDateCardDomain(
    Pick3DrawDateCardDomain.DEFAULT_CONFIG
  );
  public defaultDrawDateTime: Pick3DrawTimeEnum;
  public showCountDownToDrawing = false;
  public drawDateCardUnavailable = false;
  public pick3GenerateId: number;
  public drawTimeCard: Pick3DrawTimeCard;
  public selectedDrawTimeCard: Pick3DrawTimeCardProperties;
  public generateNavigation: any;
  public slideNumberClass: boolean;
  public viewNavigation: any;
  public currentSlideNumber: number;
  private drawDateSubscription: Subscription;
  private cardContextSubscription: Subscription;
  private readonly defaultDrawTimeCard: Pick3DrawTimeCard;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private static counter = 0;
  private routerUrl;
  private selectedWinningNumbers: any;

  constructor(
    private cardContextService: CardContextService,
    public drawStateService: DrawStateService,
    private toastService: IonicToastNotificationService,
    private router: Router,
    public translate: I18nService,
    public translateService: TranslateService,
    private drawDateService: DrawDateService,
    private pick3WebScrappingService: Pick3WebScrapingProviderService,
    private appService: AppService,
    private popoverController: PopoverController,
    private navCtrl: NavController
  ) {
    this.routerUrl = this.router.url;

    if (this.routerUrl === '/home') {
      this.slideNumberClass = true;
      this.id = ++Pick3DrawDateInfoSection.counter;
      /* istanbul ignore next */
      try {
        this.defaultDrawTimeCard = this.appService.getPick3DrawTimeCards(
          this.id
        )[0];
      } catch (error) {
        /* istanbul ignore if */
        if (this.id >= 1 && this.id <= 7) {
          throw error;
        }
      }
      /* istanbul ignore else */
    } else {
      /* istanbul ignore next */
      this.slideNumberClass = false;
    }
  }
  /* istanbul ignore next */
  ionViewDidEnter() {
    console.log(`Pick3DrawDateInfoSection.ionViewDidEnter(): `);
  }

  ngOnInit(): void {
    const someDateTime = new Date();
    const pick3DrawTime: Pick3DrawTime =
      this.appService.getDrawTime(someDateTime);
    const currentPick3DrawTimeCard =
      this.appService.getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime(
        pick3DrawTime
      );
    const routerState = this.router.getCurrentNavigation().extras.state;
    /* istanbul ignore else */
    if (this.routerUrl === '/home') {
      this.setData(
        this.appService.getDrawState(),
        currentPick3DrawTimeCard,
        this.appService.getBackgroundImageUrl(),
        this.getCurrentDrawTimeIcon(pick3DrawTime)
      );
      /* istanbul ignore next */
      this.currentSlideNumber = routerState?.currentSlideNumber;
      /* istanbul ignore else */
    } else {
      /* istanbul ignore next */
      const selectedPick3DrawTimeCard = this.appService.retrievePick3DrawDate(
        routerState?.currentSlideNumber,
        routerState?.currentDay
      );
      /* istanbul ignore next */
      this.setData(
        this.appService.getDrawState(),
        selectedPick3DrawTimeCard,
        this.appService.getBackgroundImageUrl(),
        selectedPick3DrawTimeCard.getIcon()
      );
      /* istanbul ignore next */
      this.currentSlideNumber = routerState?.currentSlideNumber;
    }

    registerLocaleData(localeEsMx, 'es-MX');
    registerLocaleData(localeEnUS, 'en-US');
    /* istanbul ignore next */
    this.drawDateSubscription = this.drawDateService
      .getPick3DrawDateCard$()
      .subscribe((currentPick3DrawDateCard: Pick3DrawTimeCard) => {
        this.pick3GenerateId = this.appService.pick3CardId;
        const currentPick3DrawDateCardId =
          currentPick3DrawDateCard.getPick3DrawCardId();
        if (this.routerUrl === '/home') {
          if (
            currentPick3DrawDateCardId &&
            currentPick3DrawDateCardId === this.id
          ) {
            console.log(this.currentSlideNumber);
            this.disableButtonOnCard(currentPick3DrawDateCardId);
            this.appService.pick3CardId = currentPick3DrawDateCardId;
            this.setData(
              this.appService.getDrawState(),
              currentPick3DrawDateCard,
              this.appService.getBackgroundImageUrl(),
              currentPick3DrawDateCard.getIcon()
            );
            this.drawTimeCard = currentPick3DrawDateCard;
            this.showCountDownToDrawing =
              currentPick3DrawDateCard.showCountDownToDrawing;
          }
        } else if (this.routerUrl === '/select-picks') {
          this.currentSlideNumber = this.appService.pick3CardId;
          this.setData(
            this.appService.getDrawState(),
            currentPick3DrawDateCard,
            this.appService.getBackgroundImageUrl(),
            currentPick3DrawDateCard.getIcon()
          );
          this.drawTimeCard = currentPick3DrawDateCard;
          this.showCountDownToDrawing =
            currentPick3DrawDateCard.showCountDownToDrawing;
        }
      });

    this.generateNavigation = this.drawStateService.generateNavigationChoice;
    this.viewNavigation = this.drawStateService.viewNavigationChoice;
    this.cardContextSubscription = this.cardContextService.context$.subscribe(
      (context) => {
        /* istanbul ignore if */
        if (
          context &&
          /* istanbul ignore next */ context.slideNumber === this.id
        ) {
          console.log(
            'Pick3DrawDateInfoSection.cardContextService.context$.subscribe() method: context: ',
            context
          );
          const pick3DrawDateCard = this.appService.getPick3DrawDateCard(
            context.slideNumber
          );
          const currentPick3DrawTimeCard = this.drawTimeCard
            ? this.drawTimeCard
            : this.defaultDrawTimeCard;
          this.defaultDrawDateTime = context.defaultDrawDateTime;
          this.setData(
            pick3DrawDateCard.getDrawState(),
            currentPick3DrawTimeCard,
            this.appService.getBackgroundImageUrl(),
            currentPick3DrawTimeCard.getIcon()
          );
        }
      }
    );
  }
  /* istanbul ignore next */
  ngOnDestroy(): void {
    console.log(`Pick3DrawDateInfoSection.ngOnDestroy: id: ${this.id}`);
    this.data = null;
    this.defaultDrawDateTime = null;
    this.showCountDownToDrawing = false;
    this.appService = null;
    this.drawDateSubscription?.unsubscribe();
    this.cardContextSubscription?.unsubscribe();

    if (this.routerUrl === '/home') {
      Pick3DrawDateInfoSection.counter--;
      console.log(
        `Pick3DrawDateInfoSection.ngOnDestroy: counter: ${Pick3DrawDateInfoSection.counter}`
      );
    }
  }

  /* istanbul ignore next */
  async showPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LanguagePopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    popover.style.cssText =
      '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
    return await popover.present();
  }
  /* istanbul ignore next */
  private setData(
    drawState: string,
    pick3DrawTimeCard: Pick3DrawTimeCard,
    backgroundImageUrl: string,
    drawTimeIcon: string
  ): void {
    const pick3DrawTime = pick3DrawTimeCard.getPick3DrawTime();

    this.data.setBackgroundImage(backgroundImageUrl);
    this.data.setDrawState(drawState);
    this.data.setDrawTime(pick3DrawTime.getType());
    this.data.setDrawDate(new Date(pick3DrawTime.getDateTime()));
    this.data.setIcon(drawTimeIcon);

    if (
      this.appService.winningNumberHasBeenDrawn(
        pick3DrawTime
      ) /* && this.appService.getNextDrawingTime(pick3DrawTime)*/
    ) {
      if (
        BytePushers.DateUtility.isSameDate(
          pick3DrawTime.getDateTime(),
          new Date()
        )
      ) {
        this.getCurrentWinningDrawingNumber(
          this.data.getDrawState(),
          pick3DrawTime.getDateTime(),
          pick3DrawTime.getType()
        );
      } else {
        this.getPastWinningDrawingNumber(
          this.data.getDrawState(),
          pick3DrawTime.getDateTime(),
          pick3DrawTime.getType()
        );
      }
    } else {
      if (
        BytePushers.DateUtility.isSameDate(
          pick3DrawTime.getDateTime(),
          new Date()
        )
      ) {
        this.getCurrentWinningDrawingNumber(
          this.data.getDrawState(),
          pick3DrawTime.getDateTime(),
          pick3DrawTime.getType()
        );
      } else {
        this.getPastWinningDrawingNumber(
          this.data.getDrawState(),
          pick3DrawTime.getDateTime(),
          pick3DrawTime.getType()
        );
      }

      pick3DrawTimeCard.showCountDownToDrawing = true;
    }
  }
  /* istanbul ignore next */
  private getCurrentDrawTimeIcon(pick3DrawTime: Pick3DrawTime): string {
    let pick3DrawTimeCard: Pick3DrawTimeCard;

    try {
      pick3DrawTimeCard = this.appService
        .getPick3DrawTimeCards(this.id)
        .find((drawTime) => {
          // TODO We need to convert what is coming from scraper to the real enum
          // TODO Then we want to use drawTime.toString DAY Day
          const drawTimeValue = Pick3DrawTimeEnum.toString(
            drawTime.getDrawTimeValue()
          );

          if (
            drawTimeValue ===
            Pick3DrawTimeEnum.toString(pick3DrawTime.getType())
          ) {
            return true;
          }
        });
    } catch (error) {
      if (this.id >= 1 && this.id <= 7) {
        throw error;
      }
    }
    return pick3DrawTimeCard === null || pick3DrawTimeCard === undefined
      ? null
      : pick3DrawTimeCard.getIcon();
  }
  /* istanbul ignore next */
  private setDrawState(
    pick3DrawDateCard: Pick3DrawDateCard,
    pick3DrawTimeCardStateEnum: Pick3DrawTimeCardStateEnum
  ) {
    try {
      this.appService
        .getPick3DrawTimeCards(this.id)
        .forEach((drawTime, drawTimeIndex, drawTimeArray) => {
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
  /* istanbul ignore next */
  private getPastWinningDrawingNumber(
    drawState: string,
    pick3DrawDateTime: Date,
    pick3DrawTimeType: Pick3DrawTimeEnum
  ): void {
    this.pick3WebScrappingService
      .getPastWinningDrawingNumber(
        drawState,
        pick3DrawDateTime,
        pick3DrawTimeType
      )
      .then(
        (winningNumber: any) => {
          if (
            BytePushers.DateUtility.isSameDate(pick3DrawDateTime, new Date()) &&
            winningNumber != null
          ) {
            this.setCardState(winningNumber, pick3DrawTimeType);
          } else if (
            this.routerUrl === '/home' ||
            this.routerUrl === '/select-picks'
          ) {
            this.setCardState(winningNumber, pick3DrawTimeType);
          }
          /*this.selectedWinningNumbers = winningNumber;*/
        },
        (error) => {
          // TODO: Handle error.
          console.error('TODO: Handle error: ' + error, error);
          this.toastService.presentToast(
            'Internal Error',
            'Please try again later.',
            'internet-not-available'
          );
          this.drawDateCardUnavailable = true;
          this.showCountDownToDrawing = true;
          this.setCardState(null, pick3DrawTimeType);
        }
      );
  }
  /* istanbul ignore next */
  private getCurrentWinningDrawingNumber(
    drawState: string,
    pick3DrawDateTime: Date,
    pick3DrawTimeType: Pick3DrawTimeEnum
  ): void {
    this.pick3WebScrappingService
      .getCurrentWinningDrawingNumber(
        drawState,
        pick3DrawDateTime,
        pick3DrawTimeType
      )
      .then(
        (winningNumber: any) => {
          this.setCardState(winningNumber, pick3DrawTimeType);
        },
        (error) => {
          // TODO: Handle error.
          console.warn('TODO: Handle error: ' + error, error);
          this.toastService.presentToast(
            'Results Not Available',
            'Please try again later.',
            'results-not-available'
          );
          this.setCardState(null, pick3DrawTimeType);
        }
      );
  }
  /* istanbul ignore next */
  private setCardState(
    winningNumber: any,
    pick3DrawTimeType: Pick3DrawTimeEnum
  ): void {
    const drawingResult = {
      drawDate: winningNumber?.date,
      drawTime: winningNumber?.time,
      drawResult: winningNumber?.number,
    };
    let p3dtt: any;

    if (typeof pick3DrawTimeType === 'string') {
      const p: any = pick3DrawTimeType;
      p3dtt = Pick3DrawTimeEnum[p.toUpperCase()];
    } else {
      p3dtt = pick3DrawTimeType;
    }

    let selectedPick3DrawTime;

    try {
      selectedPick3DrawTime = this.appService
        .getPick3DrawTimeCards(this.id)
        .find((drawTime) => {
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
    /* istanbul ignore if */
    if (selectedPick3DrawTime) {
      switch (selectedPick3DrawTime.getState()) {
        case Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS:
          this.setDrawState(
            this.data,
            Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS
          );
          break;
        case Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS:
          this.setDrawState(
            this.data,
            Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS
          );
          break;
        case Pick3DrawTimeCardStateEnum.DRAWN:
          this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.DRAWN);
          break;
        case Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS:
          this.setDrawState(
            this.data,
            Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS
          );
          break;
        default:
          this.setDrawState(
            this.data,
            Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET
          );
      }
    }
  }
  /* istanbul ignore next */
  public switchDrawDateButtons(drawDateButtonString: any) {
    const drawDateButtonValue =
      NavigationEnum.retrieveNavigation(drawDateButtonString);
    this.drawStateService.generateNavigationChoice = drawDateButtonValue;
    this.drawStateService.viewNavigationChoice = drawDateButtonValue;
  }
  /* istanbul ignore next */
  private disableButtonOnCard(slideNumber) {
    if (slideNumber < 6) {
      this.switchDrawDateButtons('generatePicksDisabled');
    } else {
      this.switchDrawDateButtons('viewPicksDisabled');
    }
  }
  public returnToPreviousPage() {
    this.navCtrl.pop();
  }
}
