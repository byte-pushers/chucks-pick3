import { DrawingResult } from 'src/app/models/drawing-result';
import { Pick3StateLottery } from "../../models/pick3-state-lottery";

export interface Pick3WebScrapingInterfaceService {
  getPastWinningDrawingNumber(drawingState: string, drawingDate: Date, drawingTime: string): Promise<DrawingResult>;
  getCurrentWinningDrawingNumber(drawingState: string, drawingDate: Date, drawingTime: string): Promise<DrawingResult>;
  findRegisteredStateLottery(drawingState:string): Pick3StateLottery;
}

