import {Pick3DrawTimeEnum} from "./pick3-draw-time.enum";

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

    export function get(key: string):  Pick3DrawTimeCardStateEnum {
        let pick3DrawTimeCardStateEnum: Pick3DrawTimeCardStateEnum = null;

        // @ts-ignore
        if (Object.isDefinedAndNotNull(key)) {
            for (const value in Pick3DrawTimeCardStateEnum) {
                if (value == key.toUpperCase()) {
                    pick3DrawTimeCardStateEnum = Pick3DrawTimeCardStateEnum[key.toUpperCase()];
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
