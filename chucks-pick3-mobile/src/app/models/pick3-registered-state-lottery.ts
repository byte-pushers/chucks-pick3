import {Pick3StateLottery} from "./pick3-state-lottery";

export interface Pick3RegisteredStateLottery {
    getState(): string;
    setState(state: string): void;

    getStateName(): string;
    setStateName(stateName: string): void;

    getStateLottery(): Pick3StateLottery;
    setStateLottery(stateLottery: Pick3StateLottery): void;
}
