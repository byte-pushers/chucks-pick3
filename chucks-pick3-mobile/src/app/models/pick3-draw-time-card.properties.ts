import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';
import {Pick3DrawTimeCardStateEnum} from './pick3-draw-time-card-state.enum';

export interface Pick3DrawTimeCardProperties {
    pick3DrawCardId: number;
    icon: string;
    title: string;
    dateTime: Date;
    drawTime: Pick3DrawTimeEnum;
    state: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum;
    selected: boolean;
    showCountDownToDrawing: boolean;
    pick3DrawTimeArray:  number[];
}
