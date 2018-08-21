import {DrawingTime} from "../providers/prediction/api/v1/DrawingTime.model";

export interface DrawingResult {
  drawDate: string;
  drawTime: DrawingTime
  drawResult: number;
}
