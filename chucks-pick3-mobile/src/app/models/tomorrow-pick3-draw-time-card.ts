import { Pick3DrawTimeCardStateEnum } from './pick3-draw-time-card-state.enum';
import { Pick3DrawTimeEnum } from './pick3-draw-time.enum';
import { Pick3DrawDateCard } from './pick3-draw-date-card';
import { Pick3DrawTimeCardProperties } from './pick3-draw-time-card.properties';
import { Pick3DrawTime } from './pick3-draw-time';
import { TomorrowPick3DrawtimeCardProperties } from './tomorrow-pick3-drawtime-card.properties';

export interface TomorrowPick3DrawTimeCard
  extends TomorrowPick3DrawtimeCardProperties {
  showCountDownToDrawing: boolean;
  setPick3DrawCardId(pick3DrawCardId: number): void;
  getPick3DrawCardId(): number;
  getIcon(): string;
  setIcon(icon: string): void;
  getTitle(): string;
  setTitle(title: string): void;
  getState(): Pick3DrawTimeCardStateEnum;
  setState(state: Pick3DrawTimeCardStateEnum): void;
  getPick3DrawTime(): Pick3DrawTime;
  setPick3DrawTime(pick3DrawTime: Pick3DrawTime): void;
  getDrawTime(): any;
  getDrawTimeValue(): Pick3DrawTimeEnum;
  setDrawTime(drawTime: any): void;
  getSelected(): boolean;
  setSelected(selected: boolean): void;
  getShowCountDownToDrawing(): boolean;
  setShowCountDownToDrawing(showCountDownToDrawing: boolean): void;
  getDateTime(): Date;
  setDateTime(dateTime: Date): void;
  compareTo(pick3DrawDateCard: Pick3DrawDateCard): number;
  getPick3DrawTimeArray(): number[];
  setPick3DrawTimeArray(pick3DrawTimeArray: number[]);
}
