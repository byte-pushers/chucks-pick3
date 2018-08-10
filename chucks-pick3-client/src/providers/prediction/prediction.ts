import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Pick3PlaysResponse} from "./api/v1/Pick3PlaysResponse";
import {DrawingTime} from "./api/v1/DrawingTime";
import {catchError} from "rxjs/operators";

/*
  Generated class for the PredictionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PredictionProvider {

  configUrl: string = "https://39nvsj21bl.execute-api.us-east-1.amazonaws.com/Prod";

  constructor(public http: HttpClient) {
    console.log('Hello PredictionProvider Provider');
  }

  getPredictions(winDrawDate: Date, futureDrawDate: Date, winDrawTime: DrawingTime, futureDrawTime: DrawingTime, winNumber: number) {
    return this.http.get<Pick3PlaysResponse>(this.configUrl + '/numbers',
      {
        params: {
          winDrawDate: this.formatDate(winDrawDate),
          futureDrawDate: this.formatDate(futureDrawDate),
          winDrawTime: winDrawTime.toString(),
          futureDrawTime: futureDrawTime.toString(),
          winNumber: winNumber.toString()
        }
      }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
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
