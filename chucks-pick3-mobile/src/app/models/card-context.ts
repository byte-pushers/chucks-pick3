import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';
import {Pick3DrawDateCardProperties} from "./pick3-draw-date-card.properties";

export interface CardContext {
    slideNumber: number;
    data: Pick3DrawDateCardProperties;
    defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
}
