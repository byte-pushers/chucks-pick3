import { DrawingTimeEnum} from './drawing-time.enum';

export interface Pick3PlaysResponse {
  date: string;
  drawingTime: DrawingTimeEnum;
  plays: [number];
}
