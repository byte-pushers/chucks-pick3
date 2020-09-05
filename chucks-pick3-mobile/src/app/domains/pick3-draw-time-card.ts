import { Pick3DrawTimeCardStateEnum } from './pick3-draw-time-card-state.enum';

export interface Pick3DrawTimeCard {
    getIcon(): string;
    setIcon(icon: string): void;
    getTitle(): string;
    setTitle(title: string): void;
    getState(): Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum;
    setState(state: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum): void;
}
