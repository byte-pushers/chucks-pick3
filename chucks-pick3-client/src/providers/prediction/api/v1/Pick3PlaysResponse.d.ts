import { DrawingTime} from "./DrawingTime";

export interface Pick3PlaysResponse {
  date: string;
  drawingTime: DrawingTime;
  plays: [number];
}
