import { Component, OnInit } from '@angular/core';
import {Pick3DrawTimeCard} from "../../models/pick3-draw-time-card";
import {Pick3StateLottery} from "../../models/pick3-state-lottery";
import {CardContextService} from "../../services/card-context.service";
import {DrawTimeService} from "../../services/draw-time.service";

@Component({
  selector: 'app-view-picks-card',
  templateUrl: './view-picks-card.component.html',
  styleUrls: ['./view-picks-card.component.scss'],
})
export class ViewPicksCardComponent implements OnInit {
  public drawTimes: Array<Pick3DrawTimeCard> = [];
  public pick3StateLottery: Pick3StateLottery;
  private componentState;

  constructor(private cardContextService: CardContextService,
              private drawTimeService: DrawTimeService) { }

  ngOnInit() {
    this.componentState = 'initializing';
    /*this.cardContextService.context$.subscribe(context => {
      this.drawTimes.splice(0, this.drawTimes.splice.length, ...context.drawTimes);
      if (this.componentState === 'initializing') {
        const currentDrawingTime = this.drawTimeService.getCurrentDrawTimeCard();
        console.log(`ViewPicksCardComponent.ngOnInit() method:about fire event[pick3DrawTimeSource]: currentDrawingTime: ${currentDrawingTime}`, currentDrawingTime);
        this.selectDrawingTimeCard(currentDrawingTime);
      }
    });*/
    this.componentState = 'initialized';
  }


  public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
    this.drawTimes.forEach(drawTime => {
      if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
        drawTime.setSelected(false);
      } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
        drawTime.setSelected(true);
        this.drawTimeService.setCurrentDrawTimeCard(drawTime);
      }
    });
  }
}


