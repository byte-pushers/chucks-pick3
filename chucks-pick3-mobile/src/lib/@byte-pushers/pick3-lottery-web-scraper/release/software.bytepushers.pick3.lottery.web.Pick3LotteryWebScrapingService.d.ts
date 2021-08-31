declare module MPick3LotteryWebScrapingService {

    export interface ScrapingServiceDTO {
        number: number;
        date: Date;
        time: string;
    }

    export interface Pick3LotteryWebScrapingService {
        new():Pick3LotteryWebScrapingService;
        findRegisteredStateLottery(drawingState:string): {state: string, stateName: string, stateLottery: string};
        // retrievePastWinningNumber(drawingState:string, drawingDate:Date, drawingTime:string, request: Function, pageReader: {read:Function}):Promise<ScrapingServiceDTO>;
        // getCurrentDrawingTime(drawingState: string, currentTime: Date): {type: string, dateTime: Date}
    }

    export interface Main {
        ScrapingServiceDTO:ScrapingServiceDTO,
        Pick3LotteryWebScrapingService:Pick3LotteryWebScrapingService;
    }
}

declare const Pick3LotteryWebScrapingService:MPick3LotteryWebScrapingService.Main;
export = Pick3LotteryWebScrapingService;
