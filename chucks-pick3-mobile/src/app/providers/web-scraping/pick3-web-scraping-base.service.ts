import {DrawingResult} from "../../models/drawing-result";

export abstract class Pick3WebScrapingBaseService {
    protected constructor() {

    }
    public abstract getPastWinningDrawingNumber(drawingState: string, drawingDate: Date, drawingTime: string): Promise<DrawingResult>;
    public abstract getCurrentWinningDrawingNumber(drawingState: string, drawingDate: Date, drawingTime: string): Promise<DrawingResult>;
}
