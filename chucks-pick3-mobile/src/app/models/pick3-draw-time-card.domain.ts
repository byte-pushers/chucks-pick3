import { Pick3DrawTimeCard } from './pick3-draw-time-card';
import { Pick3DrawTimeCardStateEnum } from './pick3-draw-time-card-state.enum';
import {Pick3DrawTimeEnum} from "./pick3-draw-time.enum";

export class Pick3DrawTimeCardDomain implements Pick3DrawTimeCard {
    private icon: string;
    private title: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    private drawTime: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum;
    private state: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum;

    constructor(private readonly config:any) {
        this.icon = config.icon;
        this.title = config.title;
        this.drawTime = config.drawTime ? Pick3DrawTimeCardStateEnum.get(config.drawTime) : null;
        this.state = Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET;
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

    getTitle(): Pick3DrawTimeEnum.Pick3DrawTimeEnum {
        return this.title;
    }

    setTitle(title: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        this.title = title;
    }

    getDrawTime(): Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum {
        return this.drawTime;
    }

    setDrawTime(drawTime: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum) {
        this.drawTime = drawTime;
    }
}
