import { Injectable } from '@angular/core';

import { TX_PICK3_URL } from '../../app.config';

import BytePushers from '@byte-pushers/pick3-lottery-web-scraper';

@Injectable()
export class ScrapingProvider {
  service: BytePushers.Pick3LotteryWebScrapingService;

  constructor() {
    this.service = new BytePushers.Pick3LotteryWebScrapingService(TX_PICK3_URL);
  }

  public scrapeResults(drawingDate: Date, drawingTime: string): Promise<BytePushers.ScrapingServiceDTO> {
    return this.service.retrieveWinningNumber("TX", drawingDate, drawingTime);
  }

}
