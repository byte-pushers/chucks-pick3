import { DrawingResult } from 'src/app/models/drawing-result';

export abstract class ScrapingService {
  public abstract scrapeResults(drawingDate: Date, drawingTime: string): Promise<DrawingResult>;
}
