import {Pick3DrawDateCard} from "./pick3-draw-date-card";

export class Pick3DrawDateCardDomain implements Pick3DrawDateCard {
    private readonly TITLE:string = 'Pick 3 Lottery';
    private drawDate: Date;
    private drawState: string;
    private drawTime: string;
    private upcomingDrawTime: Date;
    private hasWinner: boolean;
    private backgroundImage: string;

    constructor(private readonly config: any) {

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
    getBackgroundImage(): string {
        return this.backgroundImage;
    }
    setBackgroundImage(backgroundImage: string): void {
        this.backgroundImage = backgroundImage;
    }
}
