import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { NavigationEnum } from '../models/navigate.enum';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private closedDatesArray = {
    TX: 'Sunday',
  };

  private backGroundImageArray = {
    TX: 'assets/backgrounds/texas.png',
  };

  public checkDateStateIsClosed(closedState) {
    return this.closedDatesArray[closedState];
  }

  public getStateBackgroundImage(state) {
    return this.backGroundImageArray[state];
  }
  public retrieveDay(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
}
