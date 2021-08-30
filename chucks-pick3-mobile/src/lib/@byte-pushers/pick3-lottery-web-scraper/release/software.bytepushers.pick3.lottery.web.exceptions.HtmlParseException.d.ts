declare module MHtmlParseException {
    export interface HtmlParseException {
        toString(): string;
        new(message:string): HtmlParseException;
    }
}

declare const HtmlParseException: MHtmlParseException.HtmlParseException;
export = HtmlParseException;
