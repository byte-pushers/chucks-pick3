import {Pick3DrawTimeCard} from './pick3-draw-time-card';
import {Pick3DrawTimeCardStateEnum} from './pick3-draw-time-card-state.enum';
import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';
import {Pick3DrawDateCard} from './pick3-draw-date-card';
import * as Object from 'bytepushers-js-obj-extensions';

export class Pick3DrawTimeCardDomain implements Pick3DrawTimeCard {
    static readonly DEFAULT_CONFIG: any = {
    pick3DrawCardId: null,
    icon: null,
    title: null,
    dateTime: null,
    drawTime: null,
    state: null,
    selected: false
    };

    // tslint:disable-next-line:variable-name
    private _pick3DrawCardId: number;
    // tslint:disable-next-line:variable-name
    private _icon: string;
    // tslint:disable-next-line:variable-name
    private _title: string;
    // tslint:disable-next-line:variable-name
    private _dateTime: Date;
    // tslint:disable-next-line:variable-name
    private _drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    // tslint:disable-next-line:variable-name
    private _state: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum;
    // tslint:disable-next-line:variable-name
    private _selected: boolean;

    constructor(config: any) {
        this._icon = (config) ? config.icon : null;
        this._title = (config) ? Object.isDefinedAndNotNull(config.title) ? config.title : null : null;
        this._drawTime = (config) ? Object.isDefinedAndNotNull(config.drawTime) ? (typeof config.drawTime === 'string') ? Pick3DrawTimeEnum.Pick3DrawTimeEnum[config.drawTime.toUpperCase()] : config.drawTime : null : null;
        this._state = (config) ? config.state ? (typeof config.state === 'string') ? Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum[config.state.toUpperCase()] : config.state : Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET : Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET;
        this._selected = (config) ? (typeof config.selected === 'boolean') ? config.selected : false : false;
        this._dateTime = (config) ? (Object.isDate(config.dateTime)) ? this.dateTime : new Date(config.dateTime) : null;
        this._pick3DrawCardId = (config) ? (config.pick3DrawCardId) ? config.pick3DrawCardId : null : null;
    }

    set pick3DrawCardId(pick3DrawCardId: number) {
        this._pick3DrawCardId = pick3DrawCardId;
    }

    get pick3DrawCardId(): number {
        return this._pick3DrawCardId;
    }

    setPick3DrawCardId(pick3DrawCardId: number) {
        this._pick3DrawCardId = pick3DrawCardId;
    }

    getPick3DrawCardId(): number {
        return this._pick3DrawCardId;
    }

    get icon(): string {
        return this._icon;
    }

    set icon(icon: string) {
        this._icon = icon;
    }

    getIcon(): string {
        return this._icon;
    }

    setIcon(icon: string): void {
        this._icon = icon;
    }

    get state(): Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum {
        return this._state;
    }

    set state(state: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum) {
        this._state = state;
    }

    getState(): Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum {
        return this._state;
    }

    setState(state: Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum): void {
        this._state = state;
    }

    get title(): string {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }

    getTitle(): string {
        return this._title;
    }

    setTitle(title: string): void {
        this._title = title;
    }

    get drawTime(): Pick3DrawTimeEnum.Pick3DrawTimeEnum {
        let dt: any;

        if (typeof this._drawTime === 'string') {
            let key: any = this._drawTime;

            key = key.toUpperCase();
            dt = Pick3DrawTimeEnum.Pick3DrawTimeEnum[key];
        } else {
            dt = this._drawTime;
        }

        return dt;
    }

    set drawTime(drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum) {
        let dt: any;

        if (typeof drawTime === 'string') {
            let key: any = drawTime;

            key = key.toUpperCase();
            dt = Pick3DrawTimeEnum.Pick3DrawTimeEnum[key];
        } else {
            dt = drawTime;
        }

        this._drawTime = dt;
    }

    getDrawTime(): Pick3DrawTimeEnum.Pick3DrawTimeEnum {
        let dt: any;

        if (typeof this._drawTime === 'string') {
            let key: any = this._drawTime;

            key = key.toUpperCase();
            dt = Pick3DrawTimeEnum.Pick3DrawTimeEnum[key];
        } else {
            dt = this._drawTime;
        }

        return dt;
    }

    getDrawTimeValue(): Pick3DrawTimeEnum.Pick3DrawTimeEnum {
        return this.drawTime; // dt;
    }

    setDrawTime(drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        let dt: any;

        if (typeof drawTime === 'string') {
            let key: any = drawTime;

            key = key.toUpperCase();
            dt = Pick3DrawTimeEnum.Pick3DrawTimeEnum[key];
        } else {
            dt = drawTime;
        }

        this._drawTime = dt;
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(selected: boolean) {
        this._selected = selected;
    }

    getSelected(): boolean {
        return this._selected;
    }

    setSelected(selected: boolean): void {
        this._selected = selected;
    }

    get dateTime(): Date {
        return this._dateTime;
    }

    set dateTime(dateTime: Date) {
        this._dateTime = dateTime;
    }

    getDateTime(): Date {
        return this._dateTime;
    }

    setDateTime(dateTime: Date): void {
        this._dateTime = dateTime;
    }

    compareTo(pick3DrawDateCard: Pick3DrawDateCard): number {
        let compareResult;

        if (this._drawTime === pick3DrawDateCard.getDrawTime()) {
            compareResult = 0;
        } else if (this._drawTime > pick3DrawDateCard.getDrawTime()) {
            compareResult = 1;
        } else {
            compareResult = -1;
        }

        return compareResult;
    }
}
