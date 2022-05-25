import { Pick3PlaysRequest } from './api/v1/pick3-plays-request.model';
import { Observable } from 'rxjs';
import { Pick3PlaysResponse } from './api/v1/pick3-plays-response';

export interface ChucksPick3PredictionService {
  getPredictions(request: Pick3PlaysRequest): Observable<string | Pick3PlaysResponse>;
}
