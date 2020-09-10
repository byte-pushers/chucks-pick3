import { DrawingTimeEnum } from './drawing-time.enum';

export interface Pick3PlaysRequest {
  winDrawDate: Date;
  futureDrawDate: Date;
  winDrawTime: DrawingTimeEnum;
  futureDrawTime: DrawingTimeEnum;
  winNumber: number;
}
