import { HttpClient } from '@angular/common/http';
import { ChucksPick3PredictionService } from '../app/providers/prediction/chucks-pick3-prediction.service';
// @ts-ignore
import { PredictionMockService } from '../app/providers/prediction/prediction-mock.service';
import { PredictionProvider } from '../app/providers/prediction/prediction.service';

export const environment = {
  production: false,
  getChucksPick3PredictionService: (httpClient: HttpClient) => {
    let service: ChucksPick3PredictionService;
    if (process.env.USE_MOCKS) {
      service = new PredictionMockService(httpClient);
    } else {
      service = new PredictionProvider(httpClient);
    }

    return service;
  },
};
