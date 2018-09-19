import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

import { DrawingTime } from '../../../app/providers/prediction/api/v1/DrawingTime.model';
import { ScrapingProvider } from '../../../app/providers/web-scraping/scraping.service';

import BytePushers from '@byte-pushers/pick3-lottery-web-scraper';
import { DrawingResult } from '../../../app/model/DrawingResult.model';

import { ToastController, ViewController } from 'ionic-angular';
import {ScrapingService} from '../../providers/web-scraping/scraping.service.interface';

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

  constructor(public viewController: ViewController, public scraper: ScrapingService, public toast: ToastController) {
    this.items.push({icon: 'ios-partly-sunny', winDrawTime: DrawingTime.MORNING, winNumber: null});
    this.items.push({icon: 'md-sunny', winDrawTime: DrawingTime.DAY, winNumber: null});
    this.items.push({icon: 'ios-cloudy-night', winDrawTime: DrawingTime.EVENING, winNumber: null});
    this.items.push({icon: 'moon', winDrawTime: DrawingTime.NIGHT, winNumber: null});
  }

  public ngOnChanges(): void {
    if (!this.date) {
      return;
    }
    this.loading = true;
    this.items.forEach((item: any, idx: number) => {
      item.winNumber = null;
      this.scrapeTimeOfDay(item.winDrawTime, idx);
    });
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
      drawDate: this.formatDate(this.date),
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

  private formatDate(d: Date): string {
    var month: string = '' + (d.getMonth() + 1),
      day: string = '' + d.getDate(),
      year: number = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  private dateToUrlDate(d: Date): string {
    return d.getFullYear() + '-' + (1 + d.getMonth()) + '-' + d.getDate();
  }

  private scrapeTimeOfDay(time: DrawingTime, idx: number): void {
    this.scraper.scrapeResults(this.date, time)
      .then((result) => {
        this.items[idx].winNumber = result.drawResult;
      },
      () => {
        this.items[idx].winNumber = "N/A"
      });
  }
}
