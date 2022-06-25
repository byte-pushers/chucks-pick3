import { TestBed } from '@angular/core/testing';

import { CountdownTimerService } from './countdown-timer.service';
import { BehaviorSubject } from 'rxjs';

describe('CountDownTimerService', () => {
  let service: CountdownTimerService;

  let time: BehaviorSubject<string> = new BehaviorSubject<string>('00:00:00');
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountdownTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start the timer', () => {
    service.startTimer(4);
    expect(service.state).toEqual('start');
  });

  it('should call updateTimeValue', () => {
    const spy = spyOn<any>(service, 'updateTimeValue');
    service.startTimer(5);
    expect(spy).toHaveBeenCalled();
  });

  it('should stop the timer', () => {
    service.startTimer(0);
    service.stopTimer();
    expect(service.state).toEqual('stop');
  });

  it('should return an observable', () => {
    expect(service.getTime()).toBeDefined();
  });

  it('should update the timeValue', () => {
    const spy = spyOn<any>(service, 'updateTimeValue');
    service.startTimer(5);
    expect(spy).toHaveBeenCalled();
  });
});
