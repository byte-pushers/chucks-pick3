export namespace Pick3DrawTimeEnum {
    export enum Pick3DrawTimeEnum {
        MORNING = "Morning",
        DAY = "Day",
        EVENING = "Evening",
        NIGHT = "Night"
    }

    export function toString(pick3DrawTimeEnum: Pick3DrawTimeEnum): string {
        return Pick3DrawTimeEnum[pick3DrawTimeEnum];
    }

    export function toEnum(key: string): Pick3DrawTimeEnum {
        let pick3DrawTimeEnum: Pick3DrawTimeEnum = null;

        for (const value in Pick3DrawTimeEnum) {
            if (value === key.toUpperCase()) {
                pick3DrawTimeEnum = Pick3DrawTimeEnum[key.toUpperCase()];
            }
        }
        return pick3DrawTimeEnum;
    }
}
