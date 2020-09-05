import {Pick3DrawingDateCard} from "./pick3-drawing-date-card";

export class Pick3DrawingDateCardDomain implements Pick3DrawingDateCard {
    private readonly TITLE:string = 'Pick 3 Lottery';
    private drawDate: Date;
    private drawState: string;
    private drawTime: string;
    private upcomingDrawTime: Date;
    private hasWinner: boolean;

    constructor() {

    }

    getDrawDate(): Date {
        return this.drawDate;
    }

    getDrawState(): string {
        return this.drawState;
    }

    getDrawTime(): string {
        return this.drawTime;
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

    setDrawTime(drawTime: string) {
        this.drawTime = drawTime;
    }

}
