import { DrawingTime} from './DrawingTime.model';

export interface Pick3PlaysResponse {
  date: string;
  drawingTime: DrawingTime;
  plays: [number];
}
