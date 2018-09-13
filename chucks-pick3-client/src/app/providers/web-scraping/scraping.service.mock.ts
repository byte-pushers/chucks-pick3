import {DrawingResult} from "../../model/DrawingResult.model";
import {Injectable} from "@angular/core";
import {ScrapingService} from "./scraping.service.interface";

@Injectable()
export class ScrapingServiceMock extends ScrapingService {

  constructor() {
    super();
  }

  public scrapeResults(drawingDate: Date, drawingTime: string): Promise<DrawingResult> {
    return new Promise<DrawingResult>( () => {
      return {
        drawResult: 123,
        drawDate: drawingDate,
        drawTime: drawingTime,
      };
    });
  }
}
