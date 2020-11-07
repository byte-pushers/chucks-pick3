import {DrawingResult} from "../../models/drawing-result";

export abstract class Pick3WebScrapingBaseService {
    public abstract scrapeResults(drawingDate: Date, drawingTime: string): Promise<DrawingResult>;
}
