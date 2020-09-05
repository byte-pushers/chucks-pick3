export interface Pick3DrawingDateCard {
    getTitle(): string;
    getDrawState(): string;
    setDrawState(drawState: string): void;
    getDrawTime(): string;
    setDrawTime(drawTime: string);
    getDrawDate(): Date;
    setDrawDate(drawDate: Date): void;
    getUpcomingDrawingTime(): Date;
    hasGeneratedWinner(): boolean;
}
