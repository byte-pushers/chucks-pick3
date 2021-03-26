import * as Object from 'bytepushers-js-obj-extensions';

export namespace Pick3DrawTimeEnum {
    export enum Pick3DrawTimeEnum {
        MORNING,
        DAY ,
        EVENING,
        NIGHT
    }

    export function getPropertyKey(e: Pick3DrawTimeEnum): string {
        let propertyKey: string = null;

        switch(e) {
            case Pick3DrawTimeEnum.MORNING:
                propertyKey = 'draw.time.enum.morning';
                break;
            case Pick3DrawTimeEnum.DAY:
                propertyKey = 'draw.time.enum.day';
                break;
            case Pick3DrawTimeEnum.EVENING:
                propertyKey = 'draw.time.enum.evening';
                break;
            case Pick3DrawTimeEnum.NIGHT:
                propertyKey = 'draw.time.enum.night';
                break;
        }

        return propertyKey
    }

    export function toString(e: Pick3DrawTimeEnum|string): string {
        let enumString: string = null;

        if (typeof e === "string") {
            e = e.toUpperCase();
            e = Pick3DrawTimeEnum[e];
        }

        switch(e) {
            case Pick3DrawTimeEnum.MORNING:
                enumString = 'MORNING';
                break;
            case Pick3DrawTimeEnum.DAY:
                enumString = 'DAY';
                break;
            case Pick3DrawTimeEnum.EVENING:
                enumString = 'EVENING';
                break;
            case Pick3DrawTimeEnum.NIGHT:
                enumString = 'NIGHT';
                break;
        }

        return enumString;
    }
}
