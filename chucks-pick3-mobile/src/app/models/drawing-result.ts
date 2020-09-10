import {DrawingTimeEnum} from 'src/app/providers/prediction/api/v1/drawing-time.enum';

export interface DrawingResult {
  drawDate: string;
  drawTime: DrawingTimeEnum;
  drawResult: number;
}
