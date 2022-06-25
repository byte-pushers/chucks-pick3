import { Pick3DrawTimeEnum } from './pick3-draw-time.enum';

export interface PreviousWinningNumberProperties {
  drawDate: Date;
  drawState: string;
  drawTime: Pick3DrawTimeEnum;
}
