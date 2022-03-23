import { Injectable } from '@angular/core';
import { Pick3StateLottery } from '../models/pick3-state-lottery';
import { Subject } from 'rxjs';
import { Pick3DrawDateCard } from '../models/pick3-draw-date-card';
import { Pick3DrawTimeCard } from '../models/pick3-draw-time-card';
import { Pick3WebScrapingProviderService } from '../providers/web-scraping/pick3-web-scraping-provider.service';
import { DrawTimeService } from './draw-time.service';
import { Pick3DrawDateCardDomain } from '../models/pick3-draw-date-card.domain';
import { Pick3DrawTimeCardDomain } from '../models/pick3-draw-time-card.domain';
import { Pick3DrawTimeEnum } from '../models/pick3-draw-time.enum';
import { Pick3DrawTime } from '../models/pick3-draw-time';
import { TomorrowPick3DrawTimeCard } from '../models/tomorrow-pick3-draw-time-card';

@Injectable()
export class TomorrowPick3DrawDateCardService {
  private pick3StateLottery: Pick3StateLottery;
  public pick3CardId: number;
  private pick3DrawCardIdSource = new Subject<number>();
  private card8: Pick3DrawDateCard;
  private pick3DrawDateDecks: Array<Pick3DrawDateCard> = [];
  private pick3DrawTimeCards: Array<TomorrowPick3DrawTimeCard> = [];

  constructor(
    private pick3WebScrappingService: Pick3WebScrapingProviderService,
    private drawTimeService: DrawTimeService
  ) {
    this.pick3StateLottery =
      pick3WebScrappingService.findRegisteredStateLottery('TX');
    this.init();
  }

  private init() {
    this.card8 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG,
      ...{
        slideNumber: 8,
        backgroundImageUrl: this.getBackgroundImageUrl(),
        drawState: this.getDrawState(),
        drawDate: this.getSlideDate(8),
      },
    });
    this.pick3DrawDateDecks = [this.card8];
    this.pick3DrawTimeCards = [
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.morning',
        drawTime: Pick3DrawTimeEnum.MORNING,
        icon: 'morning-icon',
        dateTime: new Date().setHours(7, 15, 0, 0),
        showCountDownToDrawing: false,
      }),
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.day',
        drawTime: Pick3DrawTimeEnum.DAY,
        icon: 'day-icon',
        dateTime: new Date().setHours(11, 45, 0, 0),
        showCountDownToDrawing: false,
      }),
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.evening',
        drawTime: Pick3DrawTimeEnum.EVENING,
        icon: 'evening-icon',
        dateTime: new Date().setHours(17, 15, 0, 0),
        showCountDownToDrawing: false,
      }),
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.night',
        drawTime: Pick3DrawTimeEnum.NIGHT,
        icon: 'night-icon',
        dateTime: new Date().setHours(21, 30, 0, 0),
        showCountDownToDrawing: false,
      }),
    ];
  }
  public getBackgroundImageUrl(): string {
    return this.pick3StateLottery.getBackgroundImageUrl();
  }

  public getCurrentDrawTime(): Pick3DrawTime {
    return this.pick3StateLottery.getCurrentDrawingTime();
  }

  public getDrawTime(someDateTime: Date): Pick3DrawTime {
    return this.pick3StateLottery.getDrawingTime(someDateTime);
  }

  public getDrawState(): string {
    return this.pick3StateLottery.getState();
  }

  public getDrawingTimeByName(drawTime: string): Pick3DrawTime {
    return this.pick3StateLottery.getDrawingTimeByName(drawTime);
  }

  /* istanbul ignore next */
  public winningNumberHasBeenDrawn(pick3DrawTime: Pick3DrawTime): Boolean {
    return this.pick3StateLottery.winningNumberHasBeenDrawn(pick3DrawTime);
  }
  public getPick3DrawTimeCards(
    slideNumber?: number
  ): TomorrowPick3DrawTimeCard[] {
    const pick3DrawTimes = this.pick3DrawTimeCards.map(
      (drawTime) => new Pick3DrawTimeCardDomain(drawTime)
    );

    pick3DrawTimes.forEach((drawTime, drawTimeIndex) => {
      const drawTimeHour = drawTime.getDateTime().getHours();
      const currentHour = new Date().getHours();
      const someDrawTime = this.getDrawTime(drawTime.getDateTime());

      if (slideNumber) {
        const slideDate = this.getSlideDate(slideNumber);

        someDrawTime.getDateTime().setDate(slideDate.getDate());
        someDrawTime.getDateTime().setMonth(slideDate.getMonth());
        someDrawTime.getDateTime().setFullYear(slideDate.getFullYear());

        drawTime.setPick3DrawCardId(slideNumber);
      }

      drawTime.setPick3DrawTime(someDrawTime);

      /*if (currentHour >= drawTimeHour && drawTimeHour <= currentHour) {
      console.log(`AppService.init() method:about fire event[pick3DrawTimeSource]: drawTime: ${drawTime}`, drawTime);
      this.drawTimeService.setCurrentDrawTimeCard(drawTime);
      }*/
    });

    return pick3DrawTimes;
  }
  public getSlideDate(slideNumber): Date {
    const slideDate: Date = new Date();

    switch (slideNumber) {
      case 8:
        slideDate.setDate(slideDate.getDate() + 1);
        break;
      default:
        throw `SlideNumber: '${slideNumber}' not supported.`;
    }

    return slideDate;
  }

  public getPick3DrawDateCard(cardNumber: number): Pick3DrawDateCard {
    return this.pick3DrawDateDecks.find(
      (pick3DrawDateDeck) => pick3DrawDateDeck.slideNumber === cardNumber
    );
  }
  public getPick3DrawDateDecks(): Pick3DrawDateCard[] {
    return this.pick3DrawDateDecks;
  }

  public getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime(
    pick3DrawTime: Pick3DrawTime
  ): Pick3DrawTimeCard {
    const pick3DrawTimeCards = this.pick3DrawTimeCards.map(
      (drawTime) => new Pick3DrawTimeCardDomain(drawTime)
    );

    // const currentHour = new Date().getHours();
    const pick3DrawTimeCard = pick3DrawTimeCards.find(
      (pick3DrawTimeCard) =>
        Pick3DrawTimeEnum.getPropertyKey(pick3DrawTimeCard.getDrawTime()) ===
          Pick3DrawTimeEnum.getPropertyKey(pick3DrawTime.getType()) &&
        pick3DrawTimeCard.getDateTime().getHours() ===
          pick3DrawTime.getDateTime().getHours() &&
        pick3DrawTimeCard.getDateTime().getMinutes() ===
          pick3DrawTime.getDateTime().getMinutes() &&
        pick3DrawTimeCard.getDateTime().getSeconds() ===
          pick3DrawTime.getDateTime().getSeconds()
    );

    pick3DrawTimeCard.setPick3DrawTime(pick3DrawTime);

    return pick3DrawTimeCard;
  }

  public retrievePick3DrawDate(
    currentSlideNumber,
    currentDrawTime
  ): Pick3DrawTimeCard {
    const pick3DrawDateCard = this.getPick3DrawDateCard(currentSlideNumber);
    const drawTime = this.getDrawTime(currentDrawTime);
    const pick3DrawTime =
      this.getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime(drawTime);
    return pick3DrawTime;
  }

  public getPick3DrawCardId$() {
    return this.pick3DrawCardIdSource.asObservable();
  }

  public dispatchCurrentDrawCardIdEvent(someCardId: number) {
    this.pick3DrawCardIdSource.next(someCardId);
  }

  public getNextWinningNumber(someDate: Date): Pick3DrawDateCard | Error {
    const pick3DrawDateCard = this.pick3DrawDateDecks.find(
      (pick3DrawDateDeck) =>
        pick3DrawDateDeck.drawDate.getDate() === someDate.getDate()
    );
    const pick3CardId = pick3DrawDateCard.getSlideNumber();

    return this.getPick3DrawDateCard(pick3CardId);
  }
}
