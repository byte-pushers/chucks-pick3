import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { NavigationEnum } from '../models/navigate.enum';

@Injectable({
  providedIn: 'root',
})
export class DrawStateService {
  picksIndicator = [];
  generateNavigationChoice: NavigationEnum.NavigationEnum;
  viewNavigationChoice: NavigationEnum.NavigationEnum;

  constructor() {}

  public updatePick3DrawState(drawState): void {
    const pick3DrawStates = Object.entries(drawState);
    this.sortPick3DrawState(pick3DrawStates);
  }

  public sortPick3DrawState(currentState) {
    if (this.picksIndicator !== null && this.picksIndicator !== undefined) {
      this.picksIndicator.splice(0, this.picksIndicator.length);
      for (let i = 0; i < currentState.length; i++) {
        const keyNames = Object(currentState[i]);
        if (keyNames[1] === false) {
          delete currentState[i];
        } else {
          this.applyPick3DrawState(keyNames, keyNames[0]);
        }
      }
    }
  }

  public applyPick3DrawState(drawStateColorIndicators: any, attributeName: string) {
    for (let property in drawStateColorIndicators) {
      /* istanbul ignore next */
      if (drawStateColorIndicators.hasOwnProperty(property)) {
        this.picksIndicator.push(attributeName);
        break;
      }
    }
  }
}
