import { ChucksPick3PredictionService } from './chucks-pick3-prediction.service';
import { Pick3PlaysRequest } from './api/v1/pick3-plays-request.model';
import { Observable, of} from 'rxjs';
import { Pick3PlaysResponse } from './api/v1/pick3-plays-response';
import {HttpClient} from "@angular/common/http";

export class PredictionMockService implements ChucksPick3PredictionService {

  constructor(private httpClient: HttpClient) {

  }
  getPredictions(request: Pick3PlaysRequest): Observable<string | Pick3PlaysResponse> {
    const generatedNumberArray = [];

    while (generatedNumberArray.length < 12) {
      const r = Math.floor(Math.random() * 999) + 1;
      if (generatedNumberArray.indexOf(r) === -1) {
        generatedNumberArray.push(r);
      }
    }

    const response: Pick3PlaysResponse = {date: null, drawingTime: null, plays: generatedNumberArray};

    return of(response);
  }
}
