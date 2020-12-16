import {Component, Input, OnInit} from '@angular/core';
import {Pick3DrawDateCard} from '../../models/pick3-draw-date-card';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3DrawTimeCardDomain} from '../../models/pick3-draw-time-card.domain';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3DrawTime} from '../../models/pick3-draw-time';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import * as BytePushers from 'bytepushers-js-core';

@Component({
  selector: 'pick3-draw-date-card',
  templateUrl: './pick3-draw-date-card.component.html',
  styleUrls: ['./pick3-draw-date-card.component.scss'],
})
export class Pick3DrawDateCardComponent implements OnInit {
  @Input() slideNumber: number;
  @Input() data: Pick3DrawDateCard;
  @Input() defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;

  private pick3DrawState: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum =
      Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET;
  public showCountDownToDrawing: boolean = false;

  drawTimes: Array<Pick3DrawTimeCard> = [
    new Pick3DrawTimeCardDomain({title: Pick3DrawTimeEnum.toString(Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING), icon: 'morning-icon'}),
    new Pick3DrawTimeCardDomain({title: Pick3DrawTimeEnum.toString(Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY), icon: 'day-icon'}),
    new Pick3DrawTimeCardDomain({title: Pick3DrawTimeEnum.toString(Pick3DrawTimeEnum.Pick3DrawTimeEnum.EVENING), icon: 'evening-icon'}),
    new Pick3DrawTimeCardDomain({title: Pick3DrawTimeEnum.toString(Pick3DrawTimeEnum.Pick3DrawTimeEnum.NIGHT), icon: 'night-icon'})
  ];

  private pick3StateLottery: Pick3StateLottery;

  constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService) {
    this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
  }

  ngOnInit() {
    const someDateTime = new Date();
    //someDateTime.setDate(someDateTime.getDate() - 1);
    //someDateTime.setHours(17, 30, 0, 0);
    let pick3DrawTime: Pick3DrawTime = this.getDrawTime(someDateTime);
    this.randomlyMockDrawTimeCardStates();
    //this.setDrawTimeCardsState();
    this.setData(this.getDrawState(), pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl(), this.getCurrentDrawTimeIcon(pick3DrawTime));
  }

  private getCurrentDrawTimeIcon(pick3DrawTime: Pick3DrawTime): string {
    const pick3DrawTimeCard: Pick3DrawTimeCard = this.drawTimes.find(drawTime => {
      if (drawTime.getTitle().toUpperCase() === pick3DrawTime.getType().toUpperCase()) {
        return true;
      }
    });

    return (pick3DrawTimeCard === null || pick3DrawTimeCard === undefined) ? null : pick3DrawTimeCard.getIcon();
  }

  private getCurrentDrawTime(): Pick3DrawTime {
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
      switch(this.pick3DrawState) {
        case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS:
          this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS);
          break;
        default:
          this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET);
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
      const compareResult = drawTime.compareTo(pick3DrawDateCard);

      if (drawTime.getTitle().toUpperCase() === Pick3DrawTimeEnum.toString(pick3DrawDateCard.getDrawTime())) {
        drawTime.setSelected(true);
      }

      if (compareResult === 0) {
        drawTime.setState(pick3DrawTimeCardStateEnum);
      } else if (compareResult === -1) {
        drawTime.setState(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN);
      } else if (compareResult === 1) {
        drawTime.setState(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET);
      }
    });
  }

  public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
    const pick3DrawTime: Pick3DrawTime = this.pick3StateLottery.getDrawingTimeByName
    (Pick3DrawTimeEnum.toString(pick3DrawTimeCard.getDrawTime()));
    this.data.setDrawDateIcon(pick3DrawTimeCard.getIcon());
    this.drawTimes.forEach(drawTime => {
      if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
        drawTime.setSelected(false);
      }
    });

    this.setData(this.getDrawState(), pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl(), pick3DrawTimeCard.getIcon());
  }

  private getPastWinningDrawingNumber(drawState: string, pick3DrawDateTime: Date, pick3DrawTimeType: string): void {
    this.pick3WebScrappingService.getPastWinningDrawingNumber(drawState, pick3DrawDateTime, pick3DrawTimeType).then(
      (winningNumber: any) => {
        this.setCardState(winningNumber);
      }, error => {
        //TODO: Handle error.
        console.error('TODO: Handle error: ' + error, error);
      });
  }

  private getCurrentWinningDrawingNumber(drawState: string, pick3DrawDateTime: Date, pick3DrawTimeType: string): void {
    this.pick3WebScrappingService.getCurrentWinningDrawingNumber(drawState, pick3DrawDateTime, pick3DrawTimeType).then(
        (winningNumber: any) => {
          this.setCardState(winningNumber);
        }, error => {
          //TODO: Handle error.
          console.error('TODO: Handle error: ' + error, error);
        });
  }

  private setCardState(winningNumber: any): void {
    const drawingResult = {
      drawDate: winningNumber.date,
      drawTime: winningNumber.time,
      drawResult: winningNumber.number,
    };
    this.data.setWinningNumber(drawingResult.drawResult);
    switch (this.pick3DrawState) {
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS:
        this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS);
        break;
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS:
        this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS);
        break;
      default:
        this.setDrawState(this.data, Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN);
    }
    this.showCountDownToDrawing = false;
  }

  private randomlyMockDrawTimeCardStates(): void {
    this.drawTimes.forEach(drawTime => {
      drawTime.setState(this.randomEnum(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum));
    });
  }

  private randomEnum<T>(anEnum: T): T[keyof T] {
    const item = Math.floor(Math.random() * Object.keys(anEnum).length);
    const i2 = Object.keys(anEnum)[item];
    return anEnum[i2];
  }
}
