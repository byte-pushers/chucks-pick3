import {Injectable} from '@angular/core';
import {stringify} from 'querystring';
import {NavigationEnum} from '../models/navigate.enum';

@Injectable({
    providedIn: 'root'
})
export class DrawStateService {
    picksIndicator = [];
    generateNavigationChoice: NavigationEnum.NavigationEnum ;
    viewNavigationChoice: NavigationEnum.NavigationEnum ;

    constructor() {
    }

    public passState(drawState): void {
        const drawStateNames = Object.entries(drawState);
        this.sortState(drawStateNames);
    }

    public sortState(currentState) {
        if (this.picksIndicator !== null && this.picksIndicator !== undefined) {
            this.picksIndicator.splice(0, this.picksIndicator.length);
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
     public applyState(drawStateColorIndicators: any, attributeName: string, booleanValue: boolean) {
        for (let property in drawStateColorIndicators) {
            if (drawStateColorIndicators.hasOwnProperty(property)) {
                this.picksIndicator.push(attributeName);
                break;
            }
        }
    }
}
