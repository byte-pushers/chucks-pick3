declare module MBytePushers {
    export interface PhoneNumberUtility {
        backSpacerDown(object:Object):void;
        backSpacerUp(object:Object, event: Event):void;
        formatPhoneNumber(object:Object): void;
    }
}

declare const BytePushersPhoneNumberUtility: MBytePushers.PhoneNumberUtility;
export = BytePushersPhoneNumberUtility;

