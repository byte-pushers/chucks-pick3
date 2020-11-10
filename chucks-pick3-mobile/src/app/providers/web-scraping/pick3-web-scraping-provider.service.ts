import * as $ from 'jquery';
import { Injectable } from '@angular/core';
import { TX_PICK3_URL } from 'src/app/app.config';
import { DrawingResult} from 'src/app/models/drawing-result';
import { Pick3WebScrapingBaseService } from './pick3-web-scraping-base.service';
import { Pick3LotteryWebScrapingService } from "@byte-pushers/pick3-lottery-web-scraper";
import { Pick3WebScrapingInterfaceService } from "./pick3-web-scraping-interface.service";
import { Pick3StateLottery } from "../../models/pick3-state-lottery";

@Injectable()
export class Pick3WebScrapingProviderService extends Pick3WebScrapingBaseService implements Pick3WebScrapingInterfaceService{
  private service: any;

  constructor() {
    super();
    this.service = new Pick3LotteryWebScrapingService(TX_PICK3_URL);
    //const morningDrawingTime: Date = this.service.getActualMorningDrawingTime('TX');
    //console.log(morningDrawingTime.toDateString(), morningDrawingTime);
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
    return this.service.retrieveWinningNumber('TX', drawingDate, drawingTime, this.request, null)
        .then((data) => {
          return {
            drawDate: data.date,
            drawTime: data.time,
            drawResult: data.number,
          };
        });
  }

  public findRegisteredStateLottery = function (drawingState:string): Pick3StateLottery {
    return this.service.findRegisteredStateLottery(drawingState);
  }
}
