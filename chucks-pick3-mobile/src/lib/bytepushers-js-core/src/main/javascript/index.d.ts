declare module MBytePushers {
    export interface PhoneNumberUtility {
        formatPhoneNumber(object: Object): void;
    }

    export interface DateUtility {
        isSameDate(someDate1: Date, someDate2: Date): boolean;
    }

    export interface BytePushers {
        PhoneNumberUtility: PhoneNumberUtility;
        DateUtility: DateUtility;
    }

}

declare const BytePushers: MBytePushers.BytePushers;
export = BytePushers;
