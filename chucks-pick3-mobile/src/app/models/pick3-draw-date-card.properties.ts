import { Pick3DrawTimeEnum } from './pick3-draw-time.enum';

export interface Pick3DrawDateCardProperties {
  drawDate: Date;
  drawState: string;
  drawTime: Pick3DrawTimeEnum;
  drawTimeAsString?: string;
  upcomingDrawTime?: Date;
  hasWinner?: boolean;
  backgroundImage: string;
  winningNumber: number;
  winningNumberDigits?: number[];
  winningNumberDigit1?: number;
  winningNumberDigit2?: number;
  winningNumberDigit3?: number;
  icon: string;
  slideNumber: number;
  slideName: string;
  defaultDrawDateTime: Pick3DrawTimeEnum;
}
