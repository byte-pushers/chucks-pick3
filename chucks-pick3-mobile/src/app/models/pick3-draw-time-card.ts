import { Pick3DrawTimeCardStateEnum } from './pick3-draw-time-card-state.enum';
import {Pick3DrawTimeEnum} from "./pick3-draw-time.enum";
import {Pick3DrawDateCard} from "./pick3-draw-date-card";

export interface Pick3DrawTimeCard {
    setPick3DrawCardId(pick3DrawCardId: number): void;
    getPick3DrawCardId(): number;
    getIcon(): string;
    setIcon(icon: string): void;
    getTitle(): string;
    setTitle(title: string): void;
    getState(): Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum;
    setState(state: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum): void;
    getDrawTime(): Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    setDrawTime(drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void;
    getSelected(): boolean;
    setSelected(selected: boolean): void;
    getDateTime(): Date;
    setDateTime(dateTime: Date): void;
    compareTo(pick3DrawDateCard: Pick3DrawDateCard): number;
}
