import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { WebScraper } from 'pick3-lottery-web-scraper';

/*
  Generated class for the PredictionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PredictionProvider {
  configUrl = "https://39nvsj21bl.execute-api.us-east-1.amazonaws.com/Prod";
  "winDrawDate=2018-07-08&winNumber=123&futureDrawDate=2018-08-08&winDrawTime=MORNING&futureDrawTime=DAY"

  constructor(public http: HttpClient) {
    console.log('Hello PredictionProvider Provider');
  }

  getPredictions(winDrawDate: Date, futureDrawDate: Date, winDrawTime: string, futureDrawTime: string, winNumber: number) {

  }

  formatDate(d: Date) {
      var month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
