import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';
import {Pick3DrawDateCardProperties} from './pick3-draw-date-card.properties';

export interface Pick3DrawDateCard extends Pick3DrawDateCardProperties{
    getTitle(): string;
    getDrawState(): string;
    setDrawState(drawState: string): void;
    getDrawTime(): Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    setDrawTime(drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum);
    getDrawDate(): Date;
    setDrawDate(drawDate: Date): void;
    getUpcomingDrawingTime(): Date;
    getHasGeneratedWinner(): boolean;
    setHasGeneratedWinner(hasWinner: boolean): void;
    getBackgroundImage(): string;
    setBackgroundImage(backgroundImage: string): void;
    getWinningNumber(): number;
    setWinningNumber(winningNumber: number): void;
    getWinningNumberDigit1(): number;
    getWinningNumberDigit2(): number;
    getWinningNumberDigit3?(): number;
    getIcon(): string;
    setIcon(icon: string): void;
    getSlideNumber(): number;
    setSlideNumber(slideNumber: number): void;
    getSlideName(): string;
    setSlideName(slideName: string): void;
    getDefaultDrawDateTime(): Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    setDefaultDrawDateTime(defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void;
}
