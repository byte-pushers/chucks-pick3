import {Injectable} from '@angular/core';
import {stringify} from 'querystring';

@Injectable({
    providedIn: 'root'
})
export class DrawStateService {
    picksIndicator = [];

    constructor() {
    }

    public passState(drawState): void {
        const drawStateNames = Object.entries(drawState);
        console.log(drawStateNames);
        this.sortState(drawStateNames);
    }

    private sortState(currentState): void {
        if (this.picksIndicator !== null && this.picksIndicator !== undefined) {
            this.picksIndicator.splice(0,this.picksIndicator.length);
            for (let i = 0; i < currentState.length; i++) {
            const keyNames = Object(currentState[i]);
            if (keyNames[1] === false) {
                delete currentState[i];
            } else {
                this.applyState(keyNames, keyNames[0], keyNames[1]);
            }
        }
        }
    }

    private applyState(drawStateColorIndicators: any, attributeName: string, booleanValue: boolean): void {
        /*console.log(test);*/
        for (let property in drawStateColorIndicators) {
            if (drawStateColorIndicators.hasOwnProperty(property)) {
                this.picksIndicator.push(attributeName);
                console.log(this.picksIndicator);
                break;
            }
        }
    }
}
