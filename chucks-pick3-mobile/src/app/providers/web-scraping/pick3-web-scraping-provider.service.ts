import { Injectable } from '@angular/core';
import { TX_PICK3_URL } from 'src/app/app.config';
import { DrawingResult } from 'src/app/models/drawing-result';
import { Pick3WebScrapingBaseService } from './pick3-web-scraping-base.service';
import { Pick3LotteryWebScrapingService } from '@byte-pushers/pick3-lottery-web-scraper/release';
import { Pick3WebScrapingInterfaceService } from './pick3-web-scraping-interface.service';
import { Pick3StateLottery } from '../../models/pick3-state-lottery';
import { Pick3LotteryService } from '../../services/pick3-lottery.service';
import { Pick3DrawTimeEnum } from '../../models/pick3-draw-time.enum';
import { PageReader } from './page.reader';

@Injectable()
export class Pick3WebScrapingProviderService extends Pick3WebScrapingBaseService implements Pick3WebScrapingInterfaceService {
  private service: any;
  private pageReader = new PageReader();

  constructor(private pick3LotteryService: Pick3LotteryService) {
    super();
    this.service = new Pick3LotteryWebScrapingService(/*'https://www.txlottery.org'*/ TX_PICK3_URL);
    // const morningDrawingTime: Date = this.service.getActualMorningDrawingTime('TX');
  }

  public request(url: string, callback: Function): void {
    /*$.ajax({
      url: url,
      dataType: 'html',
      success: function(data) {
        const response = {statusCode: 200};
        callback(null, response, data);
      },
      error: function(xhr, status, error) {
        const html = xhr.status + ': ' + xhr.statusText;
        const response = {statusCode: xhr.status}
        callback(error, response, html);
      }
    });*/
    /*$.get(url, null, function(data) {
      callback(data);
    });*/
    /*const injector = Injector.create({providers: [{provide: Pick3LotteryService, deps: []}]});

    const pick3LotteryService: Pick3LotteryService = injector.get(Pick3LotteryService);*/

    this.pick3LotteryService.getPick3LotteryPastWinningNumbers(url).subscribe(
      (html) => {
        callback(null, null, html);
      },
      (error) => {
        callback(error, null, null);
      }
    );
  }

  public getPastWinningDrawingNumber(drawingState: string, drawingDate: Date, drawingTime: Pick3DrawTimeEnum): Promise<DrawingResult> {
    let dt = Pick3DrawTimeEnum.toString(drawingTime).toLowerCase();

    return this.service.findRegisteredStateLottery(drawingState).retrievePastWinningNumber('TX', drawingDate, dt.charAt(0).toUpperCase() + dt.slice(1), this, this.pageReader);
  }

  public getCurrentWinningDrawingNumber(drawingState: string, drawingDate: Date, drawingTime: Pick3DrawTimeEnum): Promise<DrawingResult> {
    let dt = Pick3DrawTimeEnum.toString(drawingTime).toLowerCase();

    return this.service.findRegisteredStateLottery(drawingState).retrieveCurrentWinningNumber('TX', drawingDate, dt.charAt(0).toUpperCase() + dt.slice(1), this, this.pageReader);
  }

  public findRegisteredStateLottery = function (drawingState: string): Pick3StateLottery {
    return this.service.findRegisteredStateLottery(drawingState);
  };
}
