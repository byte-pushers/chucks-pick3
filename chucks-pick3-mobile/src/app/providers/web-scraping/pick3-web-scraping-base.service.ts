import {DrawingResult} from "../../models/drawing-result";

export abstract class Pick3WebScrapingBaseService {
    protected constructor() {

    }
    public abstract scrapeResults(drawingState: string, drawingDate: Date, drawingTime: string): Promise<DrawingResult>;
}
