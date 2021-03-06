import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import { DrawingTime } from '../../../app/providers/prediction/api/v1/DrawingTime.model';

import { DrawingResult } from '../../../app/model/DrawingResult.model';

import { ToastController, ViewController } from 'ionic-angular';
import {ScrapingService} from '../../providers/web-scraping/scraping.service.interface';
import {DateUtil} from '../../model/DateUtil';

@Component({
  selector: 'draw-results',
  templateUrl: 'draw-results.html',
})
export class DrawResultsComponent implements OnChanges {
  private items: any[] = [];
  private loading: boolean = false;

  @Input()
  public date: Date;
  @Output()
  public selected: EventEmitter<DrawingResult> = new EventEmitter<DrawingResult>();

  constructor(public viewController: ViewController, public scraper: ScrapingService,
              public toast: ToastController) {
    this.items.push({icon: 'ios-partly-sunny', winDrawTime: DrawingTime.MORNING, winNumber: null});
    this.items.push({icon: 'md-sunny', winDrawTime: DrawingTime.DAY, winNumber: null});
    this.items.push({icon: 'ios-cloudy-night', winDrawTime: DrawingTime.EVENING, winNumber: null});
    this.items.push({icon: 'moon', winDrawTime: DrawingTime.NIGHT, winNumber: null});
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['date']) {
      this.loading = true;
      this.date = changes['date'].currentValue;
      this.items.forEach((item: any, idx: number) => {
        item.winNumber = null;
        this.scrapeTimeOfDay(item.winDrawTime, idx);
      });
    }
  }

  public itemSelected(item: any): void {
    if (item.winNumber === null) {
      this.showAlert('Still gathering results for ' + item.winDrawTime.toLowerCase() + ' drawing.');
      return;
    }
    if (item.winNumber === 'N/A') {
      this.showAlert('Results for ' + item.winDrawTime.toLowerCase() + ' drawing are not yet available.');
      return;
    }
    this.selected.emit({
      drawDate: DateUtil.dateToString(this.date),
      drawTime: item.winDrawTime,
      drawResult: item.winNumber,
    });
  }

  private showAlert(msg: string): void {
    this.toast.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    }).present();
  }

  private scrapeTimeOfDay(time: DrawingTime, idx: number): void {
    this.scraper.scrapeResults(this.date, time).then(
      (result) => {
        this.items[idx].winNumber = result.drawResult;
      },
      () => {
        this.items[idx].winNumber = 'N/A';
      },
    );
  }
}
