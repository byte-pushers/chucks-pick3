import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';
import {Pick3DrawDateCardProperties} from "./pick3-draw-date-card.properties";
import {Pick3DrawTimeCard} from "./pick3-draw-time-card";

export interface CardContext {
    slideNumber: number;
    data: Pick3DrawDateCardProperties;
    defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    drawTimes: Array<Pick3DrawTimeCard>;
}
