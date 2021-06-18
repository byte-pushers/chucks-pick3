import { Component, OnInit } from '@angular/core';
import {DrawTimeService} from '../../services/draw-time.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'generate-picks-card',
  templateUrl: './generate-picks-card.component.html',
  styleUrls: ['./generate-picks-card.component.scss'],
})
export class GeneratePicksCardComponent implements OnInit {
  public drawTimes: Array<Pick3DrawTimeCard> = [];
  public pick3StateLottery: Pick3StateLottery;
  state$: Observable<object>;
  constructor(public activatedRoute: ActivatedRoute,
              private drawTimeService: DrawTimeService) {

  }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap
        .pipe(map(() => window.history.state));
    this.selectDrawingTimeCard(window.history.state);
  }
  public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
    console.log(pick3DrawTimeCard);
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
