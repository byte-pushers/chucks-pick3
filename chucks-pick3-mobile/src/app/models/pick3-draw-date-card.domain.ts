import {Pick3DrawDateCard} from './pick3-draw-date-card';
import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';
import * as Object from 'bytepushers-js-obj-extensions';

export class Pick3DrawDateCardDomain implements Pick3DrawDateCard {
    static readonly DEFAULT_CONFIG: any = {
        drawDate: null,
        drawState: null,
        drawTime: null,
        upcomingDrawTime: null,
        hasWinner: false,
        backgroundImage: null,
        winningNumber: null,
        winningNumberDigits: null,
        drawDateIcon: null
    };
    private readonly _TITLE: string = null /*'Pick 3 Lottery'*/;
    // tslint:disable-next-line:variable-name
    private _drawDate: Date;
    // tslint:disable-next-line:variable-name
    private _drawState: string;
    // tslint:disable-next-line:variable-name
    private _drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    // tslint:disable-next-line:variable-name
    private _upcomingDrawTime: Date;
    // tslint:disable-next-line:variable-name
    private _hasWinner: boolean;
    // tslint:disable-next-line:variable-name
    private _backgroundImage: string;
    // tslint:disable-next-line:variable-name
    private _winningNumber: number;
    // tslint:disable-next-line:variable-name
    private _winningNumberDigits: number[] = [];
    // tslint:disable-next-line:variable-name
    private _drawDateIcon: string;

    constructor(private readonly config: any) {
        this._drawDate = (config) ? Object.isDefinedAndNotNull(config._drawDate) ? (typeof config._drawDate === 'string') ? Pick3DrawTimeEnum.Pick3DrawTimeEnum[config._drawDate.toUpperCase()] : config._drawDate : null : null;
        this._drawState = (config) ? Object.isDefinedAndNotNull(config._drawState) ? config._drawState : null : null;
        this._drawTime = (config) ? Object.isDefinedAndNotNull(config._drawTime) ? (typeof config._drawTime === 'string') ? Pick3DrawTimeEnum.Pick3DrawTimeEnum[config._drawTime.toUpperCase()] : config._drawTime : null : null;
        this._upcomingDrawTime = (config) ? Object.isDefinedAndNotNull(config._upcomingDrawTime) ? (typeof config._upcomingDrawTime === 'string') ? Pick3DrawTimeEnum.Pick3DrawTimeEnum[config._upcomingDrawTime.toUpperCase()] : config._upcomingDrawTime : null : null;
        this._hasWinner = (config) ? (typeof config._hasWinner === 'boolean') ? config._hasWinner : false : false;
        this._backgroundImage = (config) ? Object.isDefinedAndNotNull(config._backgroundImage) ? config._backgroundImage : null : null;
        this._winningNumber = (config) ? (config._winningNumber) ? config._winningNumber : null : null;
        this._winningNumberDigits = (config) ? (config._winningNumberDigits) ? config._winningNumberDigits : null : null;
        this._drawDateIcon = (config) ? config._drawDateIcon : null;
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

    get drawState() {
        return this._drawState;
    }

    set drawState(drawState: string) {
        this._drawState = drawState;
    }

    getDrawState(): string {
        return this._drawState;
    }

    getDrawTimeAsString(): string {
        return Pick3DrawTimeEnum.getPropertyKey(this.drawTime);
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

    getTitle(): string {
        return this._TITLE;
    }

    get upcomingDrawTime() {
        return this._upcomingDrawTime;
    }

    set upcomingDrawTime(upcomingDrawTime) {
        this._upcomingDrawTime = upcomingDrawTime;
    }

    getUpcomingDrawingTime(): Date {
        return this._upcomingDrawTime;
    }

    get hasWinner() {
        return this._hasWinner;
    }

    set hasWinner(hasWinner: boolean) {
        this._hasWinner = hasWinner;
    }

    hasGeneratedWinner(): boolean {
        return this._hasWinner;
    }

    setDrawDate(drawDate: Date): void {
        this._drawDate = drawDate;
    }

    setDrawState(drawState: string): void {
        this._drawState = drawState;
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

    get backgroundImage(): string {
        return this._backgroundImage;
    }

    set backgroundImage(backgroundImage: string) {
        this._backgroundImage = backgroundImage;
    }

    getBackgroundImage(): string {
        return this._backgroundImage;
    }

    setBackgroundImage(backgroundImage: string): void {
        this._backgroundImage = backgroundImage;
    }

    get winningNumber(): number {
        return this._winningNumber;
    }

    set winningNumber(winningNumber: number) {
        this._winningNumber = winningNumber;
        this.setWinningNumberDigits(this._winningNumber);
    }

    getWinningNumber(): number {
        return this._winningNumber;
    }

    setWinningNumber(winningNumber: number) {
        this._winningNumber = winningNumber;
        this.setWinningNumberDigits(this._winningNumber);
    }

    private setWinningNumberDigits(winningNumber: number) {

        this._winningNumberDigits = [];

        while (winningNumber > 0) {
            this._winningNumberDigits.push(winningNumber % 10);
            winningNumber = Math.floor(winningNumber / 10);
        }
    }

    get winningNumberDigit1(): number {
        let digit = null;

        if (this._winningNumberDigits && this._winningNumberDigits.length > 0) {
            if (this._winningNumberDigits.length == 1) {
                digit = 0;
            } else if (this._winningNumberDigits.length == 2) {
                digit = 0;
            } else if (this._winningNumberDigits.length == 3) {
                digit = this._winningNumberDigits[2];
            }
        }

        return digit;
    }

    get winningNumberDigit2(): number {
        let digit = null;

        if (this._winningNumberDigits && this._winningNumberDigits.length > 0) {
            if (this._winningNumberDigits.length == 1) {
                digit = 0;
            } else if (this._winningNumberDigits.length == 2) {
                digit = this._winningNumberDigits[1];
            } else if (this._winningNumberDigits.length == 3) {
                digit = this._winningNumberDigits[1];
            }
        }

        return digit;
    }

    get winningNumberDigit3(): number {
        let digit = null;

        if (this._winningNumberDigits && this._winningNumberDigits.length > 0) {
            if (this._winningNumberDigits.length == 1) {
                digit = 0;
            } else if (this._winningNumberDigits.length == 2) {
                digit = this._winningNumberDigits[0];
            } else if (this._winningNumberDigits.length == 3) {
                digit = this._winningNumberDigits[0];
            }
        }

        return digit;
    }

    get drawDateIcon(): string {
        return this._drawDateIcon;
    }

    set drawDateIcon(drawDateIcon: string) {
        this._drawDateIcon = drawDateIcon;
    }

    getDrawDateIcon(): string {
        return this._drawDateIcon;
    }

    setDrawDateIcon(drawDateIcon: string): void {
        this._drawDateIcon = drawDateIcon;
    }
}
