export interface Pick3DrawTime {
    getType(): string;
    setType(type: string): void;

    getDateTime(): Date;
    setDateTime(dateTime: Date): void;
}
