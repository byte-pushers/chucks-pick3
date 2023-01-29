// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpClient } from '@angular/common/http';
import { PredictionMockService } from '../../test/mocks/app/providers/prediction/prediction-mock.service';
import { ChucksPick3PredictionService } from '../app/providers/prediction/chucks-pick3-prediction.service';
import { PredictionProvider } from '../app/providers/prediction/prediction.service';

export const environment = {
  production: false,
  getChucksPick3PredictionService: (httpClient: HttpClient) => {
    let service: ChucksPick3PredictionService;

    service = new PredictionProvider(httpClient);

    return service;
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
