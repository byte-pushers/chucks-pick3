declare module MDrawingTimeNotFoundException {
    export interface DrawingTimeNotFoundException {
        toString():string;
        new(drawingTime:string, drawingDat:Date):DrawingTimeNotFoundException;
    }
}

declare const DrawingTimeNotFoundException:MDrawingTimeNotFoundException.DrawingTimeNotFoundException;
export = DrawingTimeNotFoundException;
