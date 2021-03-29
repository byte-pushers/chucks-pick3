import { DrawingResult } from 'src/app/models/drawing-result';
import { Pick3StateLottery } from "../../models/pick3-state-lottery";
import {Pick3DrawTimeEnum} from "../../models/pick3-draw-time.enum";

export interface Pick3WebScrapingInterfaceService {
  getPastWinningDrawingNumber(drawingState: string, drawingDate: Date, drawingTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum): Promise<DrawingResult>;
  getCurrentWinningDrawingNumber(drawingState: string, drawingDate: Date, drawingTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum): Promise<DrawingResult>;
  findRegisteredStateLottery(drawingState:string): Pick3StateLottery;
}

