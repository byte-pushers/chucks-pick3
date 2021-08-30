declare module MWinningNumberNotFoundException {
    export interface WinningNumberNotFoundException {
        toString():string;
        new(digit1:string|number, digit2:string|number, digit3:string|number):WinningNumberNotFoundException;
    }
}

declare const WinningNumberNotFoundException:MWinningNumberNotFoundException.WinningNumberNotFoundException;
export = WinningNumberNotFoundException;
