import { Pick3DrawTimeCard } from './pick3-draw-time-card';
import { Pick3DrawTimeCardStateEnum } from './pick3-draw-time-card-state.enum';
import { Pick3DrawTimeEnum} from "./pick3-draw-time.enum";
import { Pick3DrawDateCard } from "./pick3-draw-date-card";
import * as Object from 'bytepushers-js-obj-extensions';

export class Pick3DrawTimeCardDomain implements Pick3DrawTimeCard {
    private pick3DrawCardId: number;
    private icon: string;
    private title: string;
    private dateTime: Date;
    private drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    private state: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum;
    private selected: boolean = false;

    constructor(config:any) {
        this.icon = (config) ? config.icon : null;
        this.title = (config) ? Object.isDefinedAndNotNull(config.title) ? config.title : null : null;
        this.drawTime = (config) ? Object.isDefinedAndNotNull(config.drawTime) ? (typeof config.drawTime === "string") ?  Pick3DrawTimeEnum.Pick3DrawTimeEnum[config.drawTime.toUpperCase()] : config.drawTime : null : null;
        this.state = (config) ? config.state ? (typeof config.state === "string") ? Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum[config.state.toUpperCase()] : config.state : Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET : Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET;
        this.selected = (config) ? (typeof config.selected === "boolean") ? config.selected : false: false;
        this.dateTime = (config) ? (Object.isDate(config.dateTime))? this.dateTime : new Date(config.dateTime) : null;
        this.pick3DrawCardId = (config) ? (config.pick3DrawCardId) ? config.pick3DrawCardId : null : null;
    }

    setPick3DrawCardId(pick3DrawCardId: number) {
        this.pick3DrawCardId = pick3DrawCardId;
    }

    getPick3DrawCardId(): number {
        return this.pick3DrawCardId;
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
        let dt: any;

        if (typeof this.drawTime === "string") {
            let key: any = this.drawTime;

            key = key.toUpperCase();
            dt = Pick3DrawTimeEnum.Pick3DrawTimeEnum[key];
        } else {
            dt = this.drawTime;
        }

        return dt;
    }

    setDrawTime(drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        let dt: any;

        if (typeof drawTime === "string") {
            let key: any = drawTime;

            key = key.toUpperCase();
            dt = Pick3DrawTimeEnum.Pick3DrawTimeEnum[key];
        } else {
            dt = drawTime;
        }

        this.drawTime = dt;
    }

    getSelected(): boolean {
        return this.selected;
    }

    setSelected(selected: boolean): void {
        this.selected = selected;
    }

    getDateTime(): Date {
        return this.dateTime;
    }

    setDateTime(dateTime: Date): void {
        this.dateTime = dateTime;
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
