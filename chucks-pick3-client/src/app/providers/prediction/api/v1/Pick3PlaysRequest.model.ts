import { DrawingTime } from './DrawingTime.model';

export interface Pick3PlaysRequest {
  winDrawDate: Date;
  futureDrawDate: Date;
  winDrawTime: DrawingTime;
  futureDrawTime: DrawingTime;
  winNumber: number;
}
