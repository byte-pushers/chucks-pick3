import { Pick3DrawTime } from './pick3-draw-time';
import { Pick3WinningNumber } from './pick3-winning-number';

export interface Pick3StateLottery {
  getState(): string;

  getStateName(): string;

  retrieveWinningNumber(drawingState, drawingDate, drawingTime, request, pageReader): Promise<Pick3WinningNumber>;

  getDrawingTime(aTime): Pick3DrawTime;

  getDrawingTimeByName(drawingTime): Pick3DrawTime;

  getCurrentDrawingTime(): Pick3DrawTime;

  getAvailableDrawingTimes(targetDrawingTime): Pick3DrawTime[];

  getBackgroundImageUrl(): string;

  winningNumberHasBeenDrawn(pick3DrawTime: Pick3DrawTime): Boolean;

  getDrawingTime(currentTime: Date): Pick3DrawTime;
}
