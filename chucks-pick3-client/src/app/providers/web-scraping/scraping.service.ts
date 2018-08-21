import { HttpErrorResponse } from '@angular/common/http';
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    return 'Something bad happened; please try again later.';
  }

  private formatDate(d: Date): string {
    var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
