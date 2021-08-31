declare module MDrawingYearNotAvailableException {
    export interface DrawingYearNotAvailableException {
        toString():string;
        new(drawingTime:string, drawingDat:Date):DrawingYearNotAvailableException;
    }
}

declare const DrawingYearNotAvailableException:MDrawingYearNotAvailableException.DrawingYearNotAvailableException;
export = DrawingYearNotAvailableException;
