import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Pick3PlaysResponse} from './api/v1/Pick3PlaysResponse.model';
import {catchError} from 'rxjs/operators';

import { API_URL } from '../../app/app.config';
import {Pick3PlaysRequest} from "./api/v1/Pick3PlaysRequest.model";

@Injectable()
export class PredictionProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PredictionProvider Provider');
  }

  public getPredictions(request: Pick3PlaysRequest) {
    return this.http.get<Pick3PlaysResponse>(API_URL + "/numbers",
      {
        params: new HttpParams()
          .append("winDrawDate", this.formatDate(request.winDrawDate))
          .append("futureDrawDate", this.formatDate(request.futureDrawDate))
          .append("winDrawTime", request.winDrawTime)
          .append("futureDrawTime", request.futureDrawTime)
          .append("winNumber", "" + request.winNumber)
      }).pipe(catchError(this.handleError));
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
