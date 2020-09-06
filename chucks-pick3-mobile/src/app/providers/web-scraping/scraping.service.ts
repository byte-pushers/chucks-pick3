import { Injectable } from '@angular/core';

import { TX_PICK3_URL } from 'src/app/app.config';
import { DrawingResult} from 'src/app/models/drawing-result';
import { ScrapingService } from './scraping.service.interface';
import { Pick3LotteryWebScrapingService } from "@byte-pushers/pick3-lottery-web-scraper/release";

@Injectable()
export class ScrapingProvider extends ScrapingService {
  private service: any;

  constructor() {
    super();
    this.service = new Pick3LotteryWebScrapingService(TX_PICK3_URL);
  }

  public scrapeResults(drawingDate: Date, drawingTime: string): Promise<DrawingResult> {
    return this.service.retrieveWinningNumber('TX', drawingDate, drawingTime)
      .then((data) => {
        return {
          drawDate: data.date,
          drawTime: data.time,
          drawResult: data.number,
        };
      });
  }
}
