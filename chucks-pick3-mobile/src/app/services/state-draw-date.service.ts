import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { NavigationEnum } from '../models/navigate.enum';

@Injectable({
  providedIn: 'root',
})
export class StateDrawDateService {
  private closedDatesArray = {
    TX: 'Sunday',
  };

  public checkDateStateIsClosed(closedState) {
    return this.closedDatesArray[closedState];
  }
}
