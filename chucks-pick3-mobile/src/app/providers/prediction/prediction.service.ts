import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pick3PlaysResponse } from './api/v1/pick3-plays-response';
import { catchError } from 'rxjs/operators';

import { API_URL } from '../../app.config';
import { Pick3PlaysRequest } from './api/v1/pick3-plays-request.model';
import { DateUtil } from 'src/app/models/date-util';
import { Observable, of } from 'rxjs';

@Injectable()
export class PredictionProvider {
  constructor(public http: HttpClient) {}

  public getPredictions(request: Pick3PlaysRequest): Observable<string | Pick3PlaysResponse> {
    return this.http
      .get<Pick3PlaysResponse>(API_URL + '/numbers', {
        params: new HttpParams()
          .append('winDrawDate', DateUtil.dateToString(request.winDrawDate))
          .append('futureDrawDate', DateUtil.dateToString(request.futureDrawDate))
          .append('winDrawTime', request.winDrawTime)
          .append('futureDrawTime', request.futureDrawTime)
          .append('winNumber', '' + request.winNumber),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<string> {
    if (error.error instanceof ErrorEvent) {
      console.error(`Returned code ${error.status}, ` + `body was: ${JSON.stringify(error.error)}`);
    }
    return of('Something bad happened; please try again later.');
  }
}
