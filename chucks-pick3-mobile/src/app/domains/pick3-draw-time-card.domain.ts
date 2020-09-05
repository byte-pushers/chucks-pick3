import { Pick3DrawTimeCard } from './pick3-draw-time-card';
import { Pick3DrawTimeCardStateEnum } from './pick3-draw-time-card-state.enum';

export class Pick3DrawTimeCardDomain implements Pick3DrawTimeCard {
    private icon: string;
    private title: string;
    private state: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum;

    constructor(private readonly config:any) {
        this.icon = config.icon;
        this.title = config.title;
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

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }
    
}
