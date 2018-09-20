import {DrawingResult} from '../../model/DrawingResult.model';

export abstract class ScrapingService {
  public abstract scrapeResults(drawingDate: Date, drawingTime: string): Promise<DrawingResult>;
}
