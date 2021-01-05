import * as Object from 'bytepushers-js-obj-extensions';

export namespace Pick3DrawTimeCardStateEnum {
    export enum Pick3DrawTimeCardStateEnum {
        NOT_DRAWN_YET = "not.drawn.yet", // gray
        NOT_DRAWN_YET_WITH_GENERATED_PICKS = "not.drawn.yet.with.generated.picks", // yellow
        DRAWN = "drawn", // gray
        DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS = "drawn.with.generated.picks.with.no.winners", // black
        DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS = "drawn.with.generated.picks.with.winners" // green
    }

    export function isDynamicDisplayType(pick3DrawTimeCardStateEnum: Pick3DrawTimeCardStateEnum): boolean {
        switch (pick3DrawTimeCardStateEnum) {
            case Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET:
            case Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS:
            case Pick3DrawTimeCardStateEnum.DRAWN:
            case Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS:
            case Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS:
                return true;
            default:
                return false;
        }
    }

    export function get(keyOrValue: string):  Pick3DrawTimeCardStateEnum {
        let pick3DrawTimeCardStateEnum: Pick3DrawTimeCardStateEnum = null;

        if (Object.isDefinedAndNotNull(keyOrValue)) {
            if (typeof keyOrValue === 'string') {
                keyOrValue = keyOrValue.toUpperCase();
                for (const value in Pick3DrawTimeCardStateEnum) {
                    if (value === keyOrValue) {
                        pick3DrawTimeCardStateEnum = Pick3DrawTimeCardStateEnum[keyOrValue];
                        break;
                    }
                }
            } else if (typeof keyOrValue === 'number') {
                switch(keyOrValue) {
                    case Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET:
                        pick3DrawTimeCardStateEnum = Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET;
                        break;
                    case Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS:
                        pick3DrawTimeCardStateEnum = Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS;
                        break;
                    case Pick3DrawTimeCardStateEnum.DRAWN:
                        pick3DrawTimeCardStateEnum = Pick3DrawTimeCardStateEnum.DRAWN;
                        break;
                    case Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS:
                        pick3DrawTimeCardStateEnum = Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS;
                        break;
                    case Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS:
                        pick3DrawTimeCardStateEnum = Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS;
                        break;
                }
            }
        }

        return pick3DrawTimeCardStateEnum;
    }

    export function toString(pick3DrawTimeCardStateEnum: Pick3DrawTimeCardStateEnum): string {
        return Pick3DrawTimeCardStateEnum[pick3DrawTimeCardStateEnum];
    }
}
