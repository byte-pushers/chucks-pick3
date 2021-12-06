import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';

export interface PreviousWinningNumber {
    getDrawDate(): Date;
    setDrawDate(drawDate: Date): void;

    getDrawState(): string;
    setDrawState(drawState: string): void;

    getDrawTime(): Pick3DrawTimeEnum;
    setDrawTime(drawTime: Pick3DrawTimeEnum): void;
}
