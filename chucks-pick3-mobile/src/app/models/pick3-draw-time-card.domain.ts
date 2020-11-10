import { Pick3DrawTimeCard } from './pick3-draw-time-card';
import { Pick3DrawTimeCardStateEnum } from './pick3-draw-time-card-state.enum';
import {Pick3DrawTimeEnum} from "./pick3-draw-time.enum";
import {Pick3DrawDateCard} from "./pick3-draw-date-card";

export class Pick3DrawTimeCardDomain implements Pick3DrawTimeCard {
    private icon: string;
    private title: string;
    private drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    private state: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum;
    private selected: boolean = false;

    constructor(private readonly config:any) {
        this.icon = config.icon;
        this.title = config.title;
        this.drawTime = config.drawTime ? Pick3DrawTimeEnum.toEnum(config.drawTime) : Pick3DrawTimeEnum.toEnum(this.title) ;
        this.state = Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET;
        this.selected = typeof config.selected === "boolean" ? config.selected : false;
    }

    getIcon(): string {
        return this.icon;
    }

    setIcon(icon: string): void {
        this.icon = icon
    }

    getState(): Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum {
        return this.state;
    }

    setState(state: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum): void {
        this.state = state;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getDrawTime(): Pick3DrawTimeEnum.Pick3DrawTimeEnum {
        return this.drawTime;
    }

    setDrawTime(drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum) {
        this.drawTime = drawTime;
    }

    getSelected(): boolean {
        return this.selected;
    }

    setSelected(selected: boolean): void {
        this.selected = selected;
    }

    compareTo(pick3DrawDateCard: Pick3DrawDateCard): number {
        let compareResult;

        if (this.drawTime === pick3DrawDateCard.getDrawTime()) {
            compareResult = 0;
        } else if (this.drawTime > pick3DrawDateCard.getDrawTime()) {
            compareResult = 1;
        } else {
            compareResult = -1;
        }

        return compareResult;
    }
}
