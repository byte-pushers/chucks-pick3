import {Pick3DrawDateCard} from './pick3-draw-date-card';
import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';
import * as Object from 'bytepushers-js-obj-extensions';

export class Pick3DrawDateCardDomain implements Pick3DrawDateCard {
    static readonly DEFAULT_CONFIG: any = {
        drawDate: null,
        drawState: null,
        drawTime: null,
        drawTimeAsString: null,
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
    private _slideNumber: number;
    private _slideName: string;
    private _defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;

    constructor(private readonly config: any) {
        this._drawDate = (config) ? Object.isDefinedAndNotNull(config.drawDate) ? (typeof config.drawDate === 'string')
            ? Pick3DrawTimeEnum.Pick3DrawTimeEnum[config.drawDate.toUpperCase()] : config.drawDate : null : null;
        this._drawState = (config) ? Object.isDefinedAndNotNull(config.drawState) ? config.drawState : null : null;
        this._drawTime = (config) ? Object.isDefinedAndNotNull(config.drawTime) ? (typeof config.drawTime === 'string')
            ? Pick3DrawTimeEnum.Pick3DrawTimeEnum[config.drawTime.toUpperCase()] : config.drawTime : null : null;
        this._upcomingDrawTime = (config) ? Object.isDefinedAndNotNull(config.upcomingDrawTime) ? (typeof config.upcomingDrawTime === 'string')
            ? Pick3DrawTimeEnum.Pick3DrawTimeEnum[config.upcomingDrawTime.toUpperCase()] : config.upcomingDrawTime : null : null;
        this._hasWinner = (config) ? (typeof config.hasWinner === 'boolean') ? config.hasWinner : false : false;
        this._backgroundImage = (config) ? Object.isDefinedAndNotNull(config.backgroundImage) ? config.backgroundImage : null : null;
        this._winningNumber = (config) ? (config.winningNumber) ? config.winningNumber : null : null;
        this._winningNumberDigits = (config) ? (config.winningNumberDigits) ? config.winningNumberDigits : null : null;
        this._drawDateIcon = (config) ? config.drawDateIcon : null;
        this._slideNumber = (config) ? config.slideNumber : -1;
        this._slideName = (config) ? config.slideName : null;
        this._defaultDrawDateTime = (config) ? Object.isDefinedAndNotNull(config.defaultDrawDateTime) ? (typeof config.defaultDrawDateTime === 'string')
            ? Pick3DrawTimeEnum.Pick3DrawTimeEnum[config.defaultDrawDateTime.toUpperCase()] : config.defaultDrawDateTime : null : null;
    }

   /* update(): void {
        //todo: update date
        //todo: update time
        //todo: update icon
    }*/

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

    get drawState() {
        return this._drawState;
    }

    set drawState(drawState: string) {
        this._drawState = drawState;
    }

    getDrawState(): string {
        return this._drawState;
    }

    get drawTimeAsString(): string {
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

  setUpcomingDrawTime(upcomingDrawTime) {
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

  getHasGeneratedWinner() {
        return this._hasWinner;
    }

  setHasGeneratedWinner(hasWinner: boolean): void {
    this._hasWinner = hasWinner;
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

    get winningNumberDigits(): number[] {
        return this._winningNumberDigits;
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
            if (this._winningNumberDigits.length === 1) {
                digit = 0;
            } else if (this._winningNumberDigits.length === 2) {
                digit = 0;
            } else if (this._winningNumberDigits.length === 3) {
                digit = this._winningNumberDigits[2];
            }
        }

        return digit;
    }

    get winningNumberDigit2(): number {
        let digit = null;

        if (this._winningNumberDigits && this._winningNumberDigits.length > 0) {
            if (this._winningNumberDigits.length === 1) {
                digit = 0;
            } else if (this._winningNumberDigits.length === 2) {
                digit = this._winningNumberDigits[1];
            } else if (this._winningNumberDigits.length === 3) {
                digit = this._winningNumberDigits[1];
            }
        }

        return digit;
    }

    get winningNumberDigit3(): number {
        let digit = null;

        if (this._winningNumberDigits && this._winningNumberDigits.length > 0) {
            if (this._winningNumberDigits.length === 1) {
                digit = 0;
            } else if (this._winningNumberDigits.length === 2) {
                digit = this._winningNumberDigits[0];
            } else if (this._winningNumberDigits.length === 3) {
                digit = this._winningNumberDigits[0];
            }
        }

        return digit;
    }

    getWinningNumberDigit1(): number {
        let digit = null;

        if (this._winningNumberDigits && this._winningNumberDigits.length > 0) {
            if (this._winningNumberDigits.length === 1) {
                digit = 0;
            } else if (this._winningNumberDigits.length === 2) {
                digit = 0;
            } else if (this._winningNumberDigits.length === 3) {
                digit = this._winningNumberDigits[2];
            }
        }

        return digit;
    }

    getWinningNumberDigit2(): number {
        let digit = null;

        if (this._winningNumberDigits && this._winningNumberDigits.length > 0) {
            if (this._winningNumberDigits.length === 1) {
                digit = 0;
            } else if (this._winningNumberDigits.length === 2) {
                digit = this._winningNumberDigits[1];
            } else if (this._winningNumberDigits.length === 3) {
                digit = this._winningNumberDigits[1];
            }
        }

        return digit;
    }

    getWinningNumberDigit3(): number {
        let digit = null;

        if (this._winningNumberDigits && this._winningNumberDigits.length > 0) {
            if (this._winningNumberDigits.length === 1) {
                digit = 0;
            } else if (this._winningNumberDigits.length === 2) {
                digit = this._winningNumberDigits[0];
            } else if (this._winningNumberDigits.length === 3) {
                digit = this._winningNumberDigits[0];
            }
        }

        return digit;
    }

    get icon(): string {
        return this._drawDateIcon;
    }

    set icon(icon: string) {
        this._drawDateIcon = icon;
    }

    getIcon(): string {
        return this._drawDateIcon;
    }

    setIcon(drawDateIcon: string): void {
        this._drawDateIcon = drawDateIcon;
    }

    get slideNumber(): number {
        return this._slideNumber;
    }

    set slideNumber(slideNumber: number) {
        this._slideNumber = slideNumber;
    }

    getSlideNumber(): number {
        return this._slideNumber;
    }

    setSlideNumber(slideNumber: number): void {
        this._slideNumber = slideNumber;
    }

    get slideName(): string {
        return this._slideName;
    }

    set slideName(slideName: string) {
        this._slideName = slideName;
    }

    getSlideName(): string {
        return this._slideName;
    }

    setSlideName(slideName: string): void {
        this._slideName = slideName;
    }

    get defaultDrawDateTime(): Pick3DrawTimeEnum.Pick3DrawTimeEnum {
        return this._defaultDrawDateTime;
    }

    set defaultDrawDateTime(defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum) {
        this._defaultDrawDateTime = defaultDrawDateTime;
    }

    getDefaultDrawDateTime(): Pick3DrawTimeEnum.Pick3DrawTimeEnum {
        return this._defaultDrawDateTime;
    }

    setDefaultDrawDateTime(defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum): void {
        this._defaultDrawDateTime = defaultDrawDateTime;
    }
}
