import * as $ from 'jquery';
import { Injectable } from '@angular/core';
import { TX_PICK3_URL } from 'src/app/app.config';
import { DrawingResult} from 'src/app/models/drawing-result';
import { ScrapingService } from './scraping.service.interface';
import { Pick3LotteryWebScrapingService } from "@byte-pushers/pick3-lottery-web-scraper";

@Injectable()
export class ScrapingProvider extends ScrapingService {
  private service: any;

  constructor() {
    super();
    this.service = new Pick3LotteryWebScrapingService(TX_PICK3_URL);
  }

  private request(url: string, callback: Function): void {
    const pageReader = {
      read: (html): void => {

      }
    }
    $.ajax({
      url: url,
      dataType: 'text',
      success: function(data) {
        const response = {statusCode: 200};
        callback(null, response, data, )
      },
      error: function(xhr, status, error) {
        const html = xhr.status + ': ' + xhr.statusText;
        const response = {statusCode: xhr.status}
        callback(error, response, html)
      }
    });
  }

  public scrapeResults(drawingDate: Date, drawingTime: string): Promise<DrawingResult> {
    return this.service.retrieveWinningNumber('TX', drawingDate, drawingTime, this.request)
      .then((data) => {
        return {
          drawDate: data.date,
          drawTime: data.time,
          drawResult: data.number,
        };
      });
  }
}
