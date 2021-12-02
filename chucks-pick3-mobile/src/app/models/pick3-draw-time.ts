import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';

export interface Pick3DrawTime {
    getType(): Pick3DrawTimeEnum;
    setType(type: Pick3DrawTimeEnum): void;

    getDateTime(): Date;
    setDateTime(dateTime: Date): void;
}
