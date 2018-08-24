import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { DrawingTime } from '../../providers/prediction/api/v1/DrawingTime.model';
import { ScrapingProvider } from "../../providers/web-scraping/scraping.service";

import BytePushers from "@byte-pushers/pick3-lottery-web-scraper";

@IonicPage({
  segment: 'results'
})
@Component({
  selector: 'page-home',
  templateUrl: 'today.html'
})
export class TodayPage {
  items: any[] = [];

  constructor(public navCtrl: NavController, public scraper: ScrapingProvider) {

  }

  ionViewDidLoad() {
    var date = new Date();
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.MORNING, winNumber: null});
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.DAY, winNumber: null});
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.MORNING, winNumber: null});
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.NIGHT, winNumber: null});

    this.scraper.scrapeResults(date, DrawingTime.MORNING)
      .then((mornResult) => {
          this.items[0].winNumber = mornResult.number;
        },
        (error) => {
          if (error instanceof BytePushers.DrawingTimeNotFoundException) {
            this.items[0].winNumber = "TBD";
          }
        });

    this.scraper.scrapeResults(date, DrawingTime.DAY)
      .then((dayResult)  => {
        this.items[1].winNumber = dayResult.number;
      },
        (error) => {
        if (error instanceof BytePushers.DrawingTimeNotFoundException) {
          this.items[1].winNumber = "TBD";
        }
      });

    this.scraper.scrapeResults(date, DrawingTime.EVENING)
      .then((dayResult)  => {
          this.items[2].winNumber = dayResult.number;
        },
        (error) => {
          if (error instanceof BytePushers.DrawingTimeNotFoundException) {
            this.items[2].winNumber = "TBD";
          }
        });

    this.scraper.scrapeResults(date, DrawingTime.NIGHT)
      .then((dayResult)  => {
          this.items[3].winNumber = dayResult.number;
        },
        (error) => {
          if (error instanceof BytePushers.DrawingTimeNotFoundException) {
            this.items[3].winNumber = "TBD";
          }
        });
  }

  public itemSelected(item:any):void {
    this.navCtrl.push('FutureSelectPage', {
      drawDate: this.dateToUrlDate(item.winDrawDate),
      drawTime: item.winDrawTime,
      drawResult: item.winNumber
    });
  }

  private dateToUrlDate(d: Date): string {
    return d.getFullYear() + "-" + (1 + d.getMonth()) + "-" + d.getDate();
  }

}
