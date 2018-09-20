import { Injectable } from '@angular/core';

import { TX_PICK3_URL } from '../../app.config';

import BytePushers from '@byte-pushers/pick3-lottery-web-scraper';
import {DrawingResult} from '../../model/DrawingResult.model';
import {ScrapingService} from './scraping.service.interface';

@Injectable()
export class ScrapingProvider extends ScrapingService {
  private service: BytePushers.Pick3LotteryWebScrapingService;

  constructor() {
    super();
    this.service = new BytePushers.Pick3LotteryWebScrapingService(TX_PICK3_URL);
  }

  public scrapeResults(drawingDate: Date, drawingTime: string): Promise<DrawingResult> {
    return this.service.retrieveWinningNumber('TX', drawingDate, drawingTime)
      .then((data) => {
        return {
          drawDate: new Date(data.date),
          drawTime: data.time,
          drawResult: data.number,
        };
      });
  }
}
