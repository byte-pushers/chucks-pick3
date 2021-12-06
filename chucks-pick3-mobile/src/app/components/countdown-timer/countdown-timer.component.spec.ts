import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CountdownTimerComponent} from './countdown-timer.component';

describe('CountdownTimerComponent', () => {
  let component: CountdownTimerComponent;
  let fixture: ComponentFixture<CountdownTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountdownTimerComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountdownTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the timeInterval', () => {
    spyOn(component, 'getTimeDiff');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.getTimeDiff).toHaveBeenCalled();
    });
  });

  it('should be able to input a number return a new two digit number', () => {
    const twoDigitTest = component.twoDigit(6);
    expect(twoDigitTest).toEqual('06');
  });

  it('should return a time difference',  () => {
    const dateTime = 4;
    const timeDifferenceTest = component.getTimeDiff(dateTime, true);
    expect(timeDifferenceTest).toBeDefined();
  });

  it('should return as "" ',  () => {
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const timeDifferenceTest = component.getTimeDiff(time, true);
    expect(timeDifferenceTest).toEqual('');
  });

  it('should return 00:00:00:00',  () => {
    const timeDifferenceTest = component.getTimeDiff(0, false);
    expect(timeDifferenceTest).toEqual('00:00:00:00');
  });
});
