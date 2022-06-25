import {ChucksPick3PredictionService} from "./chucks-pick3-prediction.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export function createPick3PredictionServiceFactory() {
  return (httpClient: HttpClient): ChucksPick3PredictionService => {
    return environment.getChucksPick3PredictionService(httpClient);
  }
}
