import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountdownTimerService {
  private time: BehaviorSubject<string> = new BehaviorSubject<string>('00:00:00');
  private timerInSeconds: number; //in seconds
  private interval;
  private state: 'start' | 'stop' = 'stop';

  constructor() { }

  public getTime(): Observable<string> {
    return this.time.asObservable();
  }

  public startTimer(durationInSeconds: number) {
    this.state = 'start';
    clearInterval(this.interval);
    this.timerInSeconds = durationInSeconds;

    this.updateTimeValue();
    this.interval = setInterval(() => {
      this.updateTimeValue();
    }, 1000);
  }

  public stopTimer() {
    clearInterval(this.interval);
    this.time.next('00:00:00');
    this.state = 'stop';
  }

  private updateTimeValue(): void {
    let hours = this.timerInSeconds / (60 * 60);
    let minutes = (this.timerInSeconds >= 59) ?  59 : this.timerInSeconds / 60;
    let seconds = this.timerInSeconds % 60;

    const hoursText = String('0' + Math.floor(hours)).slice(-2);
    const minutesText = String('0' + Math.floor(minutes)).slice(-2);
    const secondsText = String('0' + Math.floor(seconds)).slice(-2);
    const text = hoursText + ':' + minutesText + ':' + secondsText;

    this.time.next(text);
    --this.timerInSeconds;

    if (this.timerInSeconds < 0) {
      this.stopTimer();
    }
  }
}
