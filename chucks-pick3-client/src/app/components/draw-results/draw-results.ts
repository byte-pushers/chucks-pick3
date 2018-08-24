import {Component, EventEmitter, Input, Output} from '@angular/core';

import {DrawingTime} from "../../../app/providers/prediction/api/v1/DrawingTime.model";
import {ScrapingProvider} from "../../../app/providers/web-scraping/scraping.service";

import BytePushers from "@byte-pushers/pick3-lottery-web-scraper";
import {DrawingResult} from "../../../app/model/DrawingResult.model";
import {ViewController} from "ionic-angular";

@Component({
  selector: 'draw-results',
  templateUrl: 'draw-results.html'
})
export class DrawResultsComponent {
  items: any[] = [];

  @Input() date: Date;
  @Output() selected = new EventEmitter<DrawingResult>();

  constructor(public viewController: ViewController, public scraper: ScrapingProvider) {
    this.items.push({winDrawTime: DrawingTime.MORNING, winNumber: null});
    this.items.push({winDrawTime: DrawingTime.DAY, winNumber: null});
    this.items.push({winDrawTime: DrawingTime.EVENING, winNumber: null});
    this.items.push({winDrawTime: DrawingTime.NIGHT, winNumber: null});

    viewController
  }

  ngOnInit() {
    this.scraper.scrapeResults(this.date, DrawingTime.MORNING)
      .then((mornResult) => {
          console.log("mornResult", mornResult);
          this.items[0].winNumber = mornResult.number;
        },
        (error) => {
          if (error instanceof BytePushers.DrawingTimeNotFoundException) {
            this.items[0].winNumber = "TBD";
          }
        });

    this.scraper.scrapeResults(this.date, DrawingTime.DAY)
      .then((dayResult)  => {
          this.items[1].winNumber = dayResult.number;
        },
        (error) => {
          if (error instanceof BytePushers.DrawingTimeNotFoundException) {
            this.items[1].winNumber = "TBD";
          }
        });

    this.scraper.scrapeResults(this.date, DrawingTime.EVENING)
      .then((dayResult)  => {
          this.items[2].winNumber = dayResult.number;
        },
        (error) => {
          if (error instanceof BytePushers.DrawingTimeNotFoundException) {
            this.items[2].winNumber = "TBD";
          }
        });

    this.scraper.scrapeResults(this.date, DrawingTime.NIGHT)
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
    console.log(item);
    this.selected.emit({
      drawDate: this.dateToUrlDate(this.date),
      drawTime: item.winDrawTime,
      drawResult: item.winNumber
    });
  }

  private dateToUrlDate(d: Date): string {
    return d.getFullYear() + "-" + (1 + d.getMonth()) + "-" + d.getDate();
  }
}
