export namespace Pick3DrawTimeEnum {
    export enum Pick3DrawTimeEnum {
        MORNING,
        DAY ,
        EVENING,
        NIGHT
    }

    export function toString(pick3DrawTimeEnum: Pick3DrawTimeEnum): string {
        return Pick3DrawTimeEnum[pick3DrawTimeEnum];
    }

    export function toEnum(keyOrValue: string): Pick3DrawTimeEnum {
        let pick3DrawTimeEnum: Pick3DrawTimeEnum = null;

        // @ts-ignore
        if (Object.isDefinedAndNotNull(keyOrValue)) {
            if (typeof keyOrValue === 'string') {
                keyOrValue = keyOrValue.toUpperCase();
                for (const value in Pick3DrawTimeEnum) {
                    if (value === keyOrValue) {
                        pick3DrawTimeEnum = Pick3DrawTimeEnum[keyOrValue];
                        break;
                    }
                }
            } else if (typeof keyOrValue === 'number') {
                switch(keyOrValue) {
                    case Pick3DrawTimeEnum.MORNING:
                        pick3DrawTimeEnum = Pick3DrawTimeEnum.MORNING;
                        break;
                    case Pick3DrawTimeEnum.DAY:
                        pick3DrawTimeEnum = Pick3DrawTimeEnum.DAY;
                        break;
                    case Pick3DrawTimeEnum.EVENING:
                        pick3DrawTimeEnum = Pick3DrawTimeEnum.EVENING;
                        break;
                    case Pick3DrawTimeEnum.NIGHT:
                        pick3DrawTimeEnum = Pick3DrawTimeEnum.NIGHT;
                        break;
                }
            }
        }

        return pick3DrawTimeEnum;
    }
}
