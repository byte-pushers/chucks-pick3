declare module MBytePushers {
  export interface DrawingTimeNotFoundException {
    new (drawingTime:string, drawingDat:Date):DrawingTimeNotFoundException;
    toString():string;
  }

  export interface DrawingYearNotAvailableException {
    new (drawingTime:string, drawingDat:Date):DrawingYearNotAvailableException;
    toString():string;
  }

  export interface WinningNumberNotFoundException {
    new (digit1: string|number, digit2: string|number, digit3: string|number): WinningNumberNotFoundException;
    toString():string;
  }

  export interface HtmlParseException {
    new (message:string): HtmlParseException;
    toString():string;
  }

  export interface Pick3LotteryWebScrapingService {
    new (baseUrl: string): Pick3LotteryWebScrapingService;
    findRegisteredStateLottery(drawingState:string): {state: string, stateName: string, stateLottery: string};
    /*retrievePastWinningNumber(drawingState:string, drawingDate:Date, drawingTime:string, request: Function, pageReader: {read:Function}):Promise<ScrapingServiceDTO>;
    getCurrentDrawingTime(drawingState: string, currentTime: Date): {type: string, dateTime: Date};
    getActualMorningDrawingTime(drawingState: string): Date;
    getActualDayDrawingTime(drawingState: string): Date
    getActualEveningDrawingTime(drawingState: string): Date;
    getActualNightDrawingTime(drawingState: string): Date;*/
  }

  export interface ScrapingServiceDTO {
    number: number;
    date: Date;
    time: string;
  }

  export interface BaseWebScraper {
    getBaseUrl() : string;
    getPageReader(): object;
  }

  export interface BytePushers {
    BaseWebScraper: BaseWebScraper;
    DrawingTimeNotFoundException: DrawingTimeNotFoundException;
    DrawingYearNotAvailableException: DrawingYearNotAvailableException;
    WinningNumberNotFoundException: WinningNumberNotFoundException;
    Pick3LotteryWebScrapingService: Pick3LotteryWebScrapingService;
    ScrapingServiceDTO: ScrapingServiceDTO;
  }

}

declare const BytePushers: MBytePushers.BytePushers;
export = BytePushers;
