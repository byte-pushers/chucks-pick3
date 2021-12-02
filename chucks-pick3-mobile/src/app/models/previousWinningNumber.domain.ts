import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';
import {PreviousWinningNumber} from './previousWinningNumber';
import * as Object from 'bytepushers-js-obj-extensions';

export class PreviousWinningNumberDomain implements PreviousWinningNumber {
    static readonly DEFAULT_CONFIG: any = {
        drawDate: null,
        drawState: null,
        drawTime: null
    };

    // tslint:disable-next-line:variable-name
    private _drawDate: Date;
    // tslint:disable-next-line:variable-name
    private _drawState: string;
    // tslint:disable-next-line:variable-name
    private _drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;

    constructor(config: any) {
        this._drawDate = (config) ? (Object.isDate(config.drawDate)) ? config.drawDate : new Date(config.drawDate) : null;
        this._drawState = (config) ? Object.isDefinedAndNotNull(config.drawState) ? config.drawState : null : null;
        this._drawTime = (config) ? Object.isDefinedAndNotNull(config.drawTime) ? (typeof config.drawTime === 'string') ?
            Pick3DrawTimeEnum.Pick3DrawTimeEnum[config.drawTime.toUpperCase()] : config.drawTime : null : null;
    }

    get drawDate(): Date {
        return this._drawDate;
    }

    set drawDate(drawDate: Date) {
        this._drawDate = drawDate;
    }

    getDrawDate(): Date {
        return this._drawDate;
    }

    setDrawDate(drawDate: Date): void {
        this._drawDate = drawDate;
    }

    get drawState(): string {
        return this._drawState;
    }

    set drawState(drawState: string) {
        this._drawState = drawState;
    }


    getDrawState(): string {
        return this._drawState;
    }

    setDrawState(drawState: string) {
        this._drawState = drawState;
    }

    get drawTime(): Pick3DrawTimeEnum.Pick3DrawTimeEnum {
        return this._drawTime;
    }

    set drawTime(drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum) {
        this._drawTime = drawTime;
    }
    getDrawTime(): Pick3DrawTimeEnum.Pick3DrawTimeEnum {
        return this._drawTime;
    }

    setDrawTime(drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        this._drawTime = drawTime;
    }
}
