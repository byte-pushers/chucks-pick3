import {DrawingResult} from "../../models/drawing-result";
import {Pick3DrawTimeEnum} from "../../models/pick3-draw-time.enum";

export abstract class Pick3WebScrapingBaseService {
    protected constructor() {

    }
    public abstract getPastWinningDrawingNumber(drawingState: string, drawingDate: Date, drawingTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum): Promise<DrawingResult>;
    public abstract getCurrentWinningDrawingNumber(drawingState: string, drawingDate: Date, drawingTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum): Promise<DrawingResult>;
}
