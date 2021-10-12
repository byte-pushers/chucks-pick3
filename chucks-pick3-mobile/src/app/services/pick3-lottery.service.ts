import {Injectable/*, InjectionToken*/} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
// import { HTTP } from '@ionic-native/http/ngx';
import {Observable, of} from 'rxjs';
import * as TxPick3CurrentWinningNumbers from 'src/assets/pick3/current-winning-numbers.json';
import * as TxPick3PastWinningNumbers from 'src/assets/pick3/past-winning-numbers.json';
export interface IPick3LotteryService {
  getPick3LotteryPastWinningNumbers(url: string): Observable<string>;
}

@Injectable({
    providedIn: 'root',
})
export class Pick3LotteryService implements IPick3LotteryService{

  constructor(/*private http: HTTP, */private httpClient: HttpClient) { }

  getPick3LotteryPastWinningNumbers(url: string): Observable<string> {
    const headersConfig: HttpHeaders = new HttpHeaders();
    headersConfig.append('Content-Type', 'text/html');
    const options: {
      headers?: HttpHeaders | { [header: string]: string | string[]; },
      reportProgress?: boolean,
      params?: HttpParams | { [param: string]: string | string[]; },
      responseType?: 'text',
      withCredentials?: boolean; } = {
      headers: headersConfig,
      responseType: 'text'
    };
    const requestOptions: Object = {
      /* other options here */
      headers: headersConfig,
      responseType: 'text'
    };
    // return this.httpClient.get<string>(url, requestOptions);
    // TODO if url ends with index.html return currentWinningNumbers else return pastWinningNumbers

    if (url.endsWith('/index.html')) {
      return of(TxPick3CurrentWinningNumbers.data);
    } else {
      return of(TxPick3PastWinningNumbers.data);
    }
  }

  /*getPick3LotteryPastWinningNumbers2(url: string): Observable<string> {
    const headersConfig: HttpHeaders = new HttpHeaders();
    headersConfig.append('Content-Type', 'text/html');
    const options: {
      headers?: HttpHeaders | { [header: string]: string | string[]; },
      reportProgress?: boolean,
      params?: HttpParams | { [param: string]: string | string[]; },
      responseType?: 'text',
      withCredentials?: boolean; } = {
      headers: headersConfig,
      responseType: 'text'
    };
    const requestOptions: Object = {
      /!* other options here *!/
      headers: headersConfig,
      responseType: 'text'
    }
    const pick3LotteryPastWinningNumbersObservable: Observable<string> = new Observable<string>((observer) => {
      const { next, error } = observer;
      const header: HttpHeaders = new HttpHeaders()
              .set('Content-Type', 'application/json')
          /!*.set('Authorization', 'Bearer  ' + 'AbCdEf123456')*!/;
      this.http.get(url, null, headersConfig).then(response => {
        observer.next(response.data);
      }, errorResponse => {
        observer.error(errorResponse);
      });

      return {
        unsubscribe() { }
      };
    });

    return pick3LotteryPastWinningNumbersObservable;
  }*/
}

// export const PICK3_LOTTERY_SERVICE = new InjectionToken<IPick3LotteryService>('Pick3LotteryService');
