declare module MDrawingTimeInFutureException {
    export interface MDrawingTimeInFutureException {
        toString():string;
        new(drawingTime:string, drawingDat:Date):MDrawingTimeInFutureException;
    }
}

declare const MDrawingTimeInFutureException:MDrawingTimeInFutureException.MDrawingTimeInFutureException;
export = MDrawingTimeInFutureException;
