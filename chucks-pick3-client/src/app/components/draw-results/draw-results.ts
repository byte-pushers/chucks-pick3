import {Component, EventEmitter, Input, Output} from '@angular/core';

import {DrawingTime} from "../../../app/providers/prediction/api/v1/DrawingTime.model";
import {ScrapingProvider} from "../../../app/providers/web-scraping/scraping.service";

import BytePushers from "@byte-pushers/pick3-lottery-web-scraper";
import {DrawingResult} from "../../../app/model/DrawingResult.model";

import {ToastController, ViewController} from "ionic-angular";

@Component({
  selector: 'draw-results',
  templateUrl: 'draw-results.html'
})
export class DrawResultsComponent {
  items: any[] = [];

  @Input() date: Date;
  @Output() selected = new EventEmitter<DrawingResult>();

  constructor(public viewController: ViewController, public scraper: ScrapingProvider, public toast: ToastController) {
    this.items.push({icon: 'ios-partly-sunny', winDrawTime: DrawingTime.MORNING, winNumber: null});
    this.items.push({icon: 'md-sunny', winDrawTime: DrawingTime.DAY, winNumber: null});
    this.items.push({icon: 'ios-cloudy-night', winDrawTime: DrawingTime.EVENING, winNumber: null});
    this.items.push({icon: 'moon', winDrawTime: DrawingTime.NIGHT, winNumber: null});
  }

  ngOnChanges() {
    if (!this.date) {
      return;
    }
    this.items.forEach((item: any, idx: number) => {
      item.winNumber = null;
      this.scrapeTimeOfDay(item.winDrawTime, idx);
    });
  }

  public itemSelected(item:any):void {
    if (item.winNumber == null) {
      this.showAlert('Still gathering results for ' + item.winDrawTime.toLowerCase() + ' drawing.')
      return
    }
    if (item.winNumber === "N/A") {
      this.showAlert('Results for ' + item.winDrawTime.toLowerCase() + ' drawing are not yet available.')
      return;
    }
    this.selected.emit({
      drawDate: this.dateToUrlDate(this.date),
      drawTime: item.winDrawTime,
      drawResult: item.winNumber
    });
  }

  private showAlert(msg: string) {
    this.toast.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    }).present();
  }

  private dateToUrlDate(d: Date): string {
    return d.getFullYear() + "-" + (1 + d.getMonth()) + "-" + d.getDate();
  }

  private scrapeTimeOfDay(time: DrawingTime, idx: number) {
    this.scraper.scrapeResults(this.date, time)
      .then((result) => {
        this.items[idx].winNumber = result.number;
      },
      (error) => {
        if (error instanceof BytePushers.DrawingTimeNotFoundException) {
          this.items[idx].winNumber = "N/A"
        }
      });
  }
}
