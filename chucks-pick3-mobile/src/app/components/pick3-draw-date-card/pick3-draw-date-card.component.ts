import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Pick3DrawDateCard} from "../../models/pick3-draw-date-card";
import {Pick3DrawTimeCard} from "../../models/pick3-draw-time-card";
import {Pick3DrawTimeCardDomain} from "../../models/pick3-draw-time-card.domain";
import {Pick3DrawTimeEnum} from "../../models/pick3-draw-time.enum";
import {Pick3DrawTime} from "../../models/pick3-draw-time";
import {Pick3StateLottery} from "../../models/pick3-state-lottery";
import {Pick3WebScrapingProviderService} from "../../providers/web-scraping/pick3-web-scraping-provider.service";

@Component({
  selector: 'pick3-draw-date-card',
  templateUrl: './pick3-draw-date-card.component.html',
  styleUrls: ['./pick3-draw-date-card.component.scss'],
})
export class Pick3DrawDateCardComponent implements OnInit {
  @Input() slideNumber: number;
  @Input() data: Pick3DrawDateCard;
  @Input() defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;

  public showCountDownToDrawing: boolean = false;

  drawTimes: Array<Pick3DrawTimeCard> = [
    new Pick3DrawTimeCardDomain({title: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING}),
    new Pick3DrawTimeCardDomain({title: Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY}),
    new Pick3DrawTimeCardDomain({title: Pick3DrawTimeEnum.Pick3DrawTimeEnum.EVENING}),
    new Pick3DrawTimeCardDomain({title: Pick3DrawTimeEnum.Pick3DrawTimeEnum.NIGHT})
  ];

  private pick3StateLottery: Pick3StateLottery;

  constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService) {
    this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
  }

  ngOnInit() {
    let pick3DrawTime: Pick3DrawTime = this.getCurrentDrawTime();
    this.setData(this.getDrawStateName(), pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl());
    // this.displayDrawTime(this.data.getDrawDate());
  }

  private getCurrentDrawTime(): Pick3DrawTime {
    return this.pick3StateLottery.getCurrentDrawingTime();
  }

  private getDrawStateName(): string {
    return this.pick3StateLottery.getStateName();
  }

  private setData(stateName: string, pick3DrawTime: Pick3DrawTime, backgroundImageUrl: string): void {
    this.data.setBackgroundImage(backgroundImageUrl);
    this.data.setDrawState(stateName);
    this.data.setDrawTime(Pick3DrawTimeEnum.toEnum(pick3DrawTime.getType()));
    this.data.setDrawDate(pick3DrawTime.getDateTime());

    if (this.pick3StateLottery.winningNumberHasBeenDrawn(pick3DrawTime)) {
      // this.data.setWinningNumber(this.pick3WebScrappingService.scrapeResults(pick3DrawTime.getDateTime(), pick3DrawTime.getType()));
    } else {
      this.showCountDownToDrawing = true;
    }
  }

  private displayDrawTime(drawDate: Date): void {
    const pick3DrawTime: Pick3DrawTime = this.pick3StateLottery.getDrawingTime(drawDate);
    this.setData(this.getDrawStateName(), pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl());
  }
}
