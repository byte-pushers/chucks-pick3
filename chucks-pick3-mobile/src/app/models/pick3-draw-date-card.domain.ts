import {Pick3DrawDateCard} from "./pick3-draw-date-card";
import {Pick3DrawTimeEnum} from "./pick3-draw-time.enum";

export class Pick3DrawDateCardDomain implements Pick3DrawDateCard {
    private readonly TITLE:string = 'Pick 3 Lottery';
    private drawDate: Date;
    private drawState: string;
    private drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
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

    getDrawTime(): Pick3DrawTimeEnum.Pick3DrawTimeEnum {
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

    setDrawTime(drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum) {
        this.drawTime = drawTime;
    }
    getBackgroundImage(): string {
        return this.backgroundImage;
    }
    setBackgroundImage(backgroundImage: string): void {
        this.backgroundImage = backgroundImage;
    }
}
