export interface WebScraper {
    DRAWING_TIMES() : DRAWING_TIMES;
}

interface DRAWING_TIMES {
    DAY() : BPEnum;
    EVENING() : BPEnum;
    MORNING(): BPEnum;
    NIGHT(): BPEnum;
    values: [BPEnum];
    length: number;
    name: string;
}

interface BPEnum {
    name?: string;
    value?: string;
    abbreviation?: string;
    description?: string;
}
