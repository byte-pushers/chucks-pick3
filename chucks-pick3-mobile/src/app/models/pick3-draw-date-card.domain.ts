import {Pick3DrawDateCard} from "./pick3-draw-date-card";
import {Pick3DrawTimeEnum} from "./pick3-draw-time.enum";

export class Pick3DrawDateCardDomain implements Pick3DrawDateCard {
    private readonly TITLE: string = 'Pick 3 Lottery';
    private drawDate: Date;
    private drawState: string;
    private drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    private upcomingDrawTime: Date;
    private hasWinner: boolean;
    private backgroundImage: string;
    private winningNumber: number;
    private winningNumberDigits: number[] = [];
    private drawDateIcon: string;

    constructor(private readonly config: any) {

    }

    getDrawDate(): Date {
        return this.drawDate;
    }

    getDrawState(): string {
        return this.drawState;
    }

    getDrawTimeAsString(): string {
        return Pick3DrawTimeEnum.toString(this.drawTime);
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

    getTitle(): string {
        return this.TITLE;
    }

    getUpcomingDrawingTime(): Date {
        return this.upcomingDrawTime;
    }

    hasGeneratedWinner(): boolean {
        return this.hasWinner;
    }

    setDrawDate(drawDate: Date): void {
        this.drawDate = drawDate;
    }

    setDrawState(drawState: string): void {
        this.drawState = drawState;
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

    getBackgroundImage(): string {
        return this.backgroundImage;
    }

    setBackgroundImage(backgroundImage: string): void {
        this.backgroundImage = backgroundImage;
    }

    getWinningNumber(): number {
        return this.winningNumber;
    }

    setWinningNumber(winningNumber: number) {
        this.winningNumber = winningNumber;
        this.setWinningNumberDigits(this.winningNumber);
    }

    private setWinningNumberDigits(winningNumber: number) {
        let mod;

        this.winningNumberDigits = [];

        while (winningNumber > 0) {
            this.winningNumberDigits.push(winningNumber%10);
            winningNumber = Math.floor(winningNumber/10);
        }
    }

    getWinningNumberDigit1(): number {
        let digit = null;

        if (this.winningNumberDigits && this.winningNumberDigits.length > 0) {
            if (this.winningNumberDigits.length == 1) {
                digit = 0;
            } else if (this.winningNumberDigits.length == 2) {
                digit = 0;
            } else if (this.winningNumberDigits.length == 3) {
                digit = this.winningNumberDigits[2];
            }
        }

        return digit;
    }

    getWinningNumberDigit2(): number {
        let digit = null;

        if (this.winningNumberDigits && this.winningNumberDigits.length > 0) {
            if (this.winningNumberDigits.length == 1) {
                digit = 0;
            } else if (this.winningNumberDigits.length == 2) {
                digit = this.winningNumberDigits[1];
            } else if (this.winningNumberDigits.length == 3) {
                digit = this.winningNumberDigits[1];
            }
        }

        return digit;
    }

    getWinningNumberDigit3(): number {
        let digit = null;

        if (this.winningNumberDigits && this.winningNumberDigits.length > 0) {
            if (this.winningNumberDigits.length == 1) {
                digit = 0;
            } else if (this.winningNumberDigits.length == 2) {
                digit = this.winningNumberDigits[0];
            } else if (this.winningNumberDigits.length == 3) {
                digit = this.winningNumberDigits[0];
            }
        }

        return digit;
    }

    getDrawDateIcon(): string {
        return this.drawDateIcon;
    }

    setDrawDateIcon(drawDateIcon: string): void {
        this.drawDateIcon = drawDateIcon;
    }
}
