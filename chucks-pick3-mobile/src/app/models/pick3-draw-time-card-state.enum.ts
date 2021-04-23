import * as Object from 'bytepushers-js-obj-extensions';
import {Pick3DrawTimeEnum} from "./pick3-draw-time.enum";

export namespace Pick3DrawTimeCardStateEnum {
    export enum Pick3DrawTimeCardStateEnum {
        NOT_DRAWN_YET , // gray
        NOT_DRAWN_YET_WITH_GENERATED_PICKS, // yellow
        DRAWN, // gray
        DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS, // black
        DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS // green
    }

    export function getPropertyKey(e: Pick3DrawTimeCardStateEnum): string {
        let propertyKey: string = null;

        switch(e) {
            case Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET:
                propertyKey = 'card.draw.time.state.not.drawn.yet';
                break;
            case Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS:
                propertyKey = 'card.draw.time.state.not.drawn.yet.with.generated.picks';
                break;
            case Pick3DrawTimeCardStateEnum.DRAWN:
                propertyKey = 'card.draw.time.state.drawn';
                break;
            case Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS:
                propertyKey = 'card.draw.time.state.draw.time.enum.night';
                break;
            case Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS:
                propertyKey = 'card.draw.time.state.drawn.with.generated.picks.with.winners';
                break;
        }

        return propertyKey;
    }

    export function toString(e: Pick3DrawTimeCardStateEnum|string): string {
        let enumString: string = null;

        if (typeof e === "string") {
            e = e.toUpperCase();
            e = Pick3DrawTimeCardStateEnum[e];
        }

        switch(e) {
            case Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET:
                enumString = 'NOT_DRAWN_YET';
                break;
            case Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS:
                enumString = 'NOT_DRAWN_YET_WITH_GENERATED_PICKS';
                break;
            case Pick3DrawTimeCardStateEnum.DRAWN:
                enumString = 'DRAWN';
                break;
            case Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS:
                enumString = 'DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS';
                break;
            case Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS:
                enumString = 'DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS';
                break;
        }

        return enumString;
    }
}
