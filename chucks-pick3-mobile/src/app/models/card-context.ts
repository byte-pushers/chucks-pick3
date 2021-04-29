import {Pick3DrawDateCard} from "./pick3-draw-date-card";
import {Pick3DrawTimeEnum} from "./pick3-draw-time.enum";

export interface CardContext {
    slideNumber: number;
    data: Pick3DrawDateCard;
    defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    
}
