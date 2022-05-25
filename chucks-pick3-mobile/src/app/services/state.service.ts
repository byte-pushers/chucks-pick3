import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private closedDatesMap = new Map();

  private backGroundImageMap = new Map();
  constructor() {
    this.closedDatesMap.set('TX', ['Sunday']);
    this.backGroundImageMap.set('TX', ['assets/backgrounds/texas.png']);
  }

  public getClosedDates(closedState): Array<string> {
    return this.closedDatesMap.get(closedState);
  }

  public getStateBackgroundImage(state) {
    return this.backGroundImageMap.get(state);
  }

  public retrieveDay(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
}
